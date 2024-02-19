import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FullComponent } from './layouts/full/full.component';
import { AuthenticationComponent } from './layouts/authentication/authentication.component';
import { ProfileComponent } from './profile/profile.component';
import { FriendRequestComponent } from './friend-request/friend-request.component';
import { MessageComponent } from './message/message.component';
import { NotificationComponent } from './notification/notification.component';
import {
  AuthenticationGuard,
  UnAuthenticationGuard,
} from './services/active.guard';
import { TimelineComponent } from './profile/timeline/timeline.component';
import { AboutComponent } from './profile/about/about.component';
import { PhotoComponent } from './profile/photo/photo.component';
import { FriendComponent } from './profile/friend/friend.component';
import { MoreComponent } from './profile/more/more.component';

const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      {
        path: 'home',
        component: HomeComponent,
        title: 'Home',
        canActivate: [AuthenticationGuard],
      },
      {
        path: 'friend-request',
        component: FriendRequestComponent,
        title: 'Friend Request',
        canActivate: [AuthenticationGuard],
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthenticationGuard],
        children: [
          { path: '', redirectTo: 'timeline', pathMatch: 'full' },
          {
            path: 'timeline',
            component: TimelineComponent,
            canActivate: [AuthenticationGuard],
          },
          {
            path: 'about',
            component: AboutComponent,
            canActivate: [AuthenticationGuard],
          },
          {
            path: 'photos',
            component: PhotoComponent,
            canActivate: [AuthenticationGuard],
          },
          {
            path: 'friends',
            component: FriendComponent,
            canActivate: [AuthenticationGuard],
          },
          {
            path: 'more',
            component: MoreComponent,
            canActivate: [AuthenticationGuard],
          },
        ],
      },
      {
        path: 'profile/:id',
        component: ProfileComponent,
        title: 'Profile',
        canActivate: [AuthenticationGuard],
        children: [
          { path: '', redirectTo: 'timeline', pathMatch: 'full' },
          {
            path: 'timeline',
            component: TimelineComponent,
            canActivate: [AuthenticationGuard],
          },
          {
            path: 'about',
            component: AboutComponent,
            canActivate: [AuthenticationGuard],
          },
          {
            path: 'photos',
            component: PhotoComponent,
            canActivate: [AuthenticationGuard],
          },
          {
            path: 'friends',
            component: FriendComponent,
            canActivate: [AuthenticationGuard],
          },
          {
            path: 'more',
            component: MoreComponent,
            canActivate: [AuthenticationGuard],
          },
        ],
      },
      {
        path: 'message',
        component: MessageComponent,
        title: 'Messager',
        canActivate: [AuthenticationGuard],
      },
      {
        path: 'notification',
        component: NotificationComponent,
        title: 'Notification',
        canActivate: [AuthenticationGuard],
      },
    ],
  },
  {
    path: '',
    component: AuthenticationComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
        title: 'Login',
        canActivate: [UnAuthenticationGuard],
      },
      {
        path: 'register',
        component: RegisterComponent,
        title: 'Register',
        canActivate: [UnAuthenticationGuard],
      },
    ],
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
