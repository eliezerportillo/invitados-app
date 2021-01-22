import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {

  titulo: string;
  constructor(private route: ActivatedRoute) {
    this.titulo = route.snapshot.data['titulo'];
  }

  ngOnInit(): void {
  }

}
