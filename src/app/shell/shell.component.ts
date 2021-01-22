import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute, NavigationStart } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {

  titulo: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private titleService: Title) {
    this.titulo = route.snapshot.data['titulo'];
  }

  ngOnInit(): void {

    this.router.events.pipe(
      filter(event => event instanceof NavigationStart),
    )
      .subscribe(() => {
        var rt = this.getChild(this.route)

        rt.data.subscribe(data => {
          this.titulo = data.titulo;
          this.titleService.setTitle(data.titulo);
        })
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
