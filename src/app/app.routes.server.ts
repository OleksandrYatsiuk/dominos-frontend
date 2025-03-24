import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'auth/confirm/:hash',
    renderMode: RenderMode.Client,
  },
  {
    path: 'admin/promotions/:id/edit',
    renderMode: RenderMode.Client,
  },
  {
    path: 'promotions/:id',
    renderMode: RenderMode.Client,
  }
];
