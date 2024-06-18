import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";
import { provideStore } from "@ngrx/store";
import { provideEffects } from "@ngrx/effects";
import { reducer } from "./store/app.reducer";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppEffects } from "./store/app.effects";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import {BrowserAnimationsModule, provideAnimations} from "@angular/platform-browser/animations";
import { MatNativeDateModule } from "@angular/material/core";
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { isDevMode } from '@angular/core';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {provideToastr} from "ngx-toastr";
import {appInterceptor} from "./app.interceptor";


export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
        withInterceptors([appInterceptor]),
    ),
    provideAnimations(),
    provideToastr(),
    provideHttpClient(),
    provideStore({feature: reducer}),
    provideRouter(routes),
    provideEffects([AppEffects]),
    provideAnimationsAsync(),
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
      connectInZone: true // If set to true, the connection is established within the Angular zone
    }),
    importProvidersFrom(
      FormsModule,
      ReactiveFormsModule,
      BrowserAnimationsModule,
      MatNativeDateModule,
    ),

  ],
};