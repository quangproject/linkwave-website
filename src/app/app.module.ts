import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialUIModule } from './mat-ui/mat-ui.module';
import { AuthenticationComponent } from './layouts/authentication/authentication.component';
import { FullComponent } from './layouts/full/full.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProfileComponent } from './profile/profile.component';
import { MessageComponent } from './message/message.component';
import { NotificationComponent } from './notification/notification.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { ToastrModule } from 'ngx-toastr';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ApiInterceptor } from './helpers/api-interceptor';
import { PageLikeComponent } from './component/card/page-like/page-like.component';
import { RecentNotificationsComponent } from './component/card/recent-notifications/recent-notifications.component';
import { FriendsZoneComponent } from './component/card/friends-zone/friends-zone.component';
import { CardProfileComponent } from './component/card/profile/profile.component';
import { CardPostComponent } from './component/card/post/post.component';
import { PostComponent } from './component/dialog/post/post.component';
import { VideoPlayerComponent } from './component/video-player/video-player.component';
import { TimelineComponent } from './profile/timeline/timeline.component';
import { AboutComponent } from './profile/about/about.component';
import { PhotoComponent } from './profile/photo/photo.component';
import { FriendComponent } from './profile/friend/friend.component';
import { MoreComponent } from './profile/more/more.component';
import { SettingComponent } from './profile/setting/setting.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { AboutMeComponent } from './component/dialog/about-me/about-me.component';
import { TextareaAutoresizeDirective } from './directive/textarea-autoresize.directive';
import { AvatarComponent } from './component/dialog/avatar/avatar.component';
import { CoverComponent } from './component/dialog/cover/cover.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ExperienceComponent } from './component/dialog/experience/experience.component';
import { SkillComponent } from './component/dialog/skill/skill.component';
import { RecommendComponent } from './friend/recommend/recommend.component';
import { RequestComponent } from './friend/request/request.component';
import { UserFriendComponent } from './friend/friend.component';
import { UserCardComponent } from './component/loading/user-card/user-card.component';
import { ChatComponent } from './message/chat/chat.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { CheckEmailComponent } from './forgot-password/check-email/check-email.component';
import { StompService } from './services/ws/stomp.service';
import { PostLikeComponent } from './component/dialog/post-like/post-like.component';
import { PostCommentComponent } from './component/dialog/post-comment/post-comment.component';
import { ScrollToBottomDirective } from './directive/scroll-to-bottom.directive';
import { PostCardComponent } from './component/loading/post-card/post-card.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { AdminComponent } from './layouts/admin/admin.component';
import { ManagePostComponent } from './manage-post/manage-post.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { NewMessageComponent } from './component/dialog/new-message/new-message.component';
import { SearchPeopleComponent } from './search-people/search-people.component';
import { FriendCardComponent } from './component/loading/friend-card/friend-card.component';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { GalleryLightboxComponent } from './component/card/gallery-lightbox/gallery-lightbox.component';
import { BasicComponent } from './component/chart/column/basic/basic.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { AdminDasboardComponent } from './admin-dasboard/admin-dasboard.component';
import { LineComponent } from './component/chart/mix/line/line.component';
import { SimpleComponent } from './component/chart/pie/simple/simple.component';
import { ChangePasswordComponent } from './component/change-password/change-password.component';
import { AdminChangePasswordComponent } from './admin-change-password/admin-change-password.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NotFoundComponent,
    AuthenticationComponent,
    FullComponent,
    ProfileComponent,
    MessageComponent,
    NotificationComponent,
    CardProfileComponent,
    CardPostComponent,
    PageLikeComponent,
    RecentNotificationsComponent,
    FriendsZoneComponent,
    PostComponent,
    VideoPlayerComponent,
    TimelineComponent,
    AboutComponent,
    PhotoComponent,
    FriendComponent,
    MoreComponent,
    SettingComponent,
    AboutMeComponent,
    TextareaAutoresizeDirective,
    AvatarComponent,
    CoverComponent,
    ExperienceComponent,
    SkillComponent,
    UserFriendComponent,
    RecommendComponent,
    RequestComponent,
    UserCardComponent,
    ChatComponent,
    ForgotPasswordComponent,
    CheckEmailComponent,
    PostLikeComponent,
    PostCommentComponent,
    ScrollToBottomDirective,
    PostCardComponent,
    SidebarComponent,
    AdminComponent,
    ManagePostComponent,
    ManageUserComponent,
    NewMessageComponent,
    SearchPeopleComponent,
    FriendCardComponent,
    GalleryLightboxComponent,
    BasicComponent,
    AdminDasboardComponent,
    LineComponent,
    SimpleComponent,
    ChangePasswordComponent,
    AdminChangePasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialUIModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    NgxSkeletonLoaderModule,
    ImageCropperModule,
    PickerComponent,
    NgApexchartsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true,
    },
    AuthService,
    StompService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
