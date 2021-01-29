import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute, NavigationStart, NavigationCancel, NavigationError } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {

  titulo: string;
  cargando: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private titleService: Title) {
    this.titulo = route.snapshot.data['titulo'];
  }

  ngOnInit(): void {

    this.route.data.subscribe(data => {
      this.titulo = data.titulo;
    });

    // Cambiar título
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        var rt = this.getChild(this.route);
        rt.data.subscribe(data => {
          this.titulo = data.titulo;
          this.titleService.setTitle(data.titulo);
        });
      });

    // Mostrar barra de carga
    this.router.events
      .subscribe(event => {

        switch (true) {
          case event instanceof NavigationStart: {
            this.cargando = true;
            break;
          }

          case event instanceof NavigationEnd:
          case event instanceof NavigationCancel:
          case event instanceof NavigationError: {
            this.cargando = false;
            break;
          }
        }
      });

  }

  getChild(activatedRoute: ActivatedRoute) {
    if (activatedRoute.firstChild) {
      return this.getChild(activatedRoute.firstChild);
    } else {
      return activatedRoute;
    }

  }

}
