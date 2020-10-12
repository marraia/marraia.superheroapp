import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { HeroService } from 'src/services/hero/hero.service';
import { Hero } from 'src/services/models/hero';


@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {
  public heros: Array<any> = [];

  basicForm: FormGroup;

  constructor(private _heroService: HeroService) {

  }

  ngOnInit(): void {
    this.basicForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      idEditor: new  FormControl(null, [Validators.required]),
      age: new  FormControl(null, [Validators.required]),
    })
  }

  getHeros() : void 
  {
    this._heroService.getHeros()
        .subscribe(
          (response: any) => {
            this.heros = response.data;
          },
          (error: any) => {
            alert("Erro ao carregar Herois");
          }
        )
  }

  carregar() : void {
    this.getHeros();
  }

  onSubmit() {
    var hero = new Hero(this.basicForm.controls.name.value,
                          Number(this.basicForm.controls.idEditor.value),
                          this.basicForm.controls.age.value);

    var data = JSON.stringify(hero);

    this._heroService
        .InsertHero(JSON.parse(data))
        .subscribe(
          (response: any) => {
            alert("Dados inseridos com sucesso");
          },
          (error: any) => {
            alert("Erro ao inserir Herois");
          }
        )
  }
}
