import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { PokemonAdapter } from './goble/secondary/PokemonAdapter';
import { MOVE_PORT, POKEMON_PORT } from './injection.token';
import { MoveAdapter } from './goble/secondary/MoveAdapter';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    {
      provide: POKEMON_PORT,
      useClass: PokemonAdapter,
    },
    {
      provide: MOVE_PORT,
      useClass: MoveAdapter,
    },
  ]
};
