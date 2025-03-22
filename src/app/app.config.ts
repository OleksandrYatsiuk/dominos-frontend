import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { InMemoryScrollingFeature, provideRouter, withInMemoryScrolling } from '@angular/router';

import { provideClientHydration } from '@angular/platform-browser';
import { routes } from './app.routes';
import { AppModule } from './app.module';
import { provideAnimations } from '@angular/platform-browser/animations';

const inMemoryScrollingFeature: InMemoryScrollingFeature = withInMemoryScrolling({ anchorScrolling: 'enabled' });

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideClientHydration(),
    provideAnimations(),
    provideRouter(routes, inMemoryScrollingFeature),
    importProvidersFrom([AppModule])
  ]
};
