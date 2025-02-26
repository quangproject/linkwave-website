import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NewMessageComponent } from 'src/app/component/dialog/new-message/new-message.component';
import { ScrollToBottomDirective } from 'src/app/directive/scroll-to-bottom.directive';
import { Item } from 'src/app/models/base';
import {
  Conversation,
  Message,
  MessageAttachment,
  MessageAttachmentFileType,
  Participant,
} from 'src/app/models/conversation';
import { UserInfo } from 'src/app/models/profile';
import { ConversationService } from 'src/app/services/api/conversation.service';
import { MessageService } from 'src/app/services/api/message.service';
import { AuthService } from 'src/app/services/auth.service';
import { SwalService } from 'src/app/services/swal.service';
import { ToastService } from 'src/app/services/toast.service';
import { StompService } from 'src/app/services/ws/stomp.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnChanges, OnDestroy {
  @Output() toggle: EventEmitter<void> = new EventEmitter<void>();
  @Output() markAsRead: EventEmitter<void> = new EventEmitter<void>();
  @Output() sendMessage: EventEmitter<void> = new EventEmitter<void>();
  @Input() conversationId!: string;
  friendInfo: UserInfo | undefined;
  listMessages: Message[] = [];
  currentUser: UserInfo | undefined;
  files: File[] = [];
  messageAttachReviews: any[] = [];
  messageAttachmentFileType = MessageAttachmentFileType;
  chatControl = new FormControl();
  isLoading: boolean = false;
  isLoadingSendMessage: boolean = false;
  isOpenEmojiPicker: boolean = false;

  @ViewChild(ScrollToBottomDirective)
  scroll!: ScrollToBottomDirective;

  constructor(
    private dialog: MatDialog,
    private swalService: SwalService,
    private showToast: ToastService,
    private authService: AuthService,
    private conversationService: ConversationService,
    private messageService: MessageService,
    private stompService: StompService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.stompService.connect().then(() => {
      this.stompService.initializeTopicSubscription(
        '/topic/chat',
        (message: Message) => {
          if (message.conversationId === this.conversationId) {
            this.listMessages.push(message);
          }
          this.sendMessage.emit();
        }
      );
    });
  }

  addEmoji(event: any) {
    const currentMessage = this.chatControl.value ?? '';
    this.chatControl.setValue(currentMessage + event.emoji.native);
  }

  changeLoadingState() {
    this.isLoading = !this.isLoading;
  }

  changeLoadingSendMessageState() {
    this.isLoadingSendMessage = !this.isLoadingSendMessage;
  }

  changeEmojiPickerState() {
    this.isOpenEmojiPicker = !this.isOpenEmojiPicker;
  }

  triggerFileInput(fileInput: HTMLInputElement): void {
    fileInput.click();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['conversationId'] && !changes['conversationId'].firstChange) {
      this.loadConversationById(this.conversationId);
    }
  }

  ngOnDestroy(): void {
    this.stompService.disconnect();
  }

  loadConversationById(id: string): void {
    this.changeLoadingState();
    this.conversationService.getConversationById(id).subscribe({
      next: (response: Conversation) => {
        // Get current user info
        const currentUser: UserInfo =
          this.authService.getUserData() as UserInfo;
        this.currentUser = currentUser;

        // Get friend info and list of messages
        const friend = response.participants.find(
          (participant: Participant) => participant.user.id !== currentUser.id
        );
        this.friendInfo = friend?.user;
        this.listMessages = response.messages;

        // Mark all messages as read
        const unRead = response.messages.filter(
          (message: Message) =>
            message.sender.id !== currentUser.id && !message.isRead
        );
        if (unRead.length > 0) {
          const listMessageIds = unRead.map((message) => message.id);

          this.messageService.markAsRead(listMessageIds).subscribe({
            next: () => {
              this.markAsRead.emit();
            },
            error: (response) => {
              this.showToast.showErrorMessage(
                'Error',
                response.error?.message ||
                  'Something went wrong. Please try again later'
              );
            },
          });
        }
      },
      error: (response) => {
        this.showToast.showErrorMessage(
          'Error',
          response.error?.message ||
            'Something went wrong. Please try again later'
        );
      },
      complete: () => {
        this.changeLoadingState();
      },
    });
  }

  getListMessageAttachmentFileType(
    listMessageAttachment: MessageAttachment[]
  ): Item[] {
    return listMessageAttachment.map((item) => {
      return {
        imageSrc: item.fileUrl,
        imageAlt: item.fileName,
      };
    });
  }

  toggleMenu() {
    this.toggle.emit();
  }

  submit(): void {
    if (
      (this.chatControl.value === '' || this.chatControl.value === null) &&
      this.files.length === 0
    ) {
      return;
    }

    this.changeLoadingSendMessageState();
    const content = this.chatControl.value ?? '';
    this.isOpenEmojiPicker = false;
    this.messageService
      .sendMessage(this.conversationId, content, this.files)
      .subscribe({
        next: () => {
          this.chatControl.setValue('');
          this.messageAttachReviews = [];
          this.files = [];
        },
        error: (response) => {
          this.showToast.showErrorMessage(
            'Error',
            response.error?.message ||
              'Something went wrong. Please try again later'
          );
        },
        complete: () => {
          this.changeLoadingSendMessageState();
        },
      });
  }

  newMessage() {
    const dialogRef = this.dialog.open(NewMessageComponent, {});

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.handleMessage(result);
      }
    });
  }

  handleMessage(friendId: string | undefined) {
    if (!friendId) {
      return;
    }
    this.conversationService.createConversation(friendId).subscribe({
      next: (response) => {
        this.router.navigate(['/message'], {
          queryParams: { id: response.id },
        });
      },
      error: (response) => {
        this.showToast.showErrorMessage(
          'Error',
          response.error?.message ||
            'Something went wrong. Please try again later'
        );
      },
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.files = [...this.files, ...Array.from<File>(input.files)];
      this.messageAttachReviews = this.files.map((file) => {
        return {
          file,
          type: file.type,
          objectUrl: URL.createObjectURL(file),
        };
      });
    }
  }

  getFileExtension(mimeType: string): string {
    const mimeTypes: { [key: string]: string } = {
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        'DOCX',
      'application/msword': 'DOC',
      'application/pdf': 'PDF',
      'image/png': 'PNG',
      'image/jpeg': 'JPG',
      'application/vnd.ms-excel': 'XLS',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
        'XLSX',
    };

    return mimeTypes[mimeType] || 'unknown';
  }

  isImage(type: string): boolean {
    return type.includes('image');
  }

  isWordFile(type: string): boolean {
    return type.includes('word');
  }

  isPdfFile(type: string): boolean {
    return type.includes('pdf');
  }

  isExcelFile(type: string): boolean {
    return type.includes('excel');
  }

  removeFile(index: number): void {
    this.messageAttachReviews.splice(index, 1);
    this.files.splice(index, 1);
  }

  removeConversation(): void {
    this.swalService.confirmToHandle(
      'Are you sure you want to remove?',
      'warning',
      this.processRemove.bind(this, this.conversationId)
    );
  }

  processRemove(id: string) {
    this.conversationService.removeConversation(id).subscribe({
      next: () => {
        this.sendMessage.emit();
        this.conversationId = '';
        this.router.navigate(['/message']);
      },
      error: (response) => {
        this.showToast.showErrorMessage(
          'Error',
          response.error?.message ||
            'Something went wrong. Please try again later'
        );
      },
    });
  }
}
