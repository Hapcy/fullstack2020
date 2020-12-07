import { NgModule } from '@angular/core';
import {
  INITIAL_CONFIG,
  PlatformConfig,
  ServerModule,
} from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import {
  AuthStorageService,
  ServerAuthStorageService,
} from './core/auth.service';

@NgModule({
  imports: [AppModule, ServerModule],
  providers: [
    {
      provide: INITIAL_CONFIG,
      useValue: {
        useAbsoluteUrl: true,
      } as PlatformConfig,
    },
    {
      provide: AuthStorageService,
      useClass: ServerAuthStorageService,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
