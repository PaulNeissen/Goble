import { Component, computed, effect, inject, OnInit, Signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { areSameChargedMoveType, isSameFastMoveType, Pokemon } from '../../domain/Pokemon';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { map, Observable, startWith } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { POKEMON_PORT } from '@/injection.token';
import { Move } from '@/goble/domain/Move';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dle',
  standalone: true,
  imports: [MatFormFieldModule, FormsModule, MatInputModule, CommonModule, ReactiveFormsModule, MatAutocompleteModule, MatTableModule, MatIconModule],
  templateUrl: './dle.html',
  styleUrl: './dle.scss'
})
export class Dle implements OnInit {
  private pokemonAdapter = inject(POKEMON_PORT);
  private pokemonsSignal = toSignal(this.pokemonAdapter.list(), { initialValue: []});

  // TODO : utiliser le rank plutot que le score
  // TODO : mettre des couleurs orange sur tous les critères
  // TODO : faire l'animation de victoire
  // TODO : faire les niveaux 2 et 3

  pokemonCtrl = new FormControl<string | Pokemon>('');
  filteredOptions: Observable<Pokemon[]> | undefined;
  headers: string[] = ['Pokémon', 'Score', 'Type 1', 'Type 2', 'Shadow', 'Fast Move', 'Charged 1', 'Charged 2', 'Key win', 'Key loss'];
  guessedPokemons: Pokemon[] = [];
  dailyPokemon: any;
  fastMoves: Move[] = [];

  pokemonsAlpha: Signal<Pokemon[]> = computed(() => { 
    const pokemons = this.pokemonsSignal();
    return [...pokemons].sort((a, b) => a.name.localeCompare(b.name)); 
  });

  logs = effect(() => {
    if (!this.pokemonsAlpha().length || !this.pokemonsAlpha().length) return;

    console.log('Pokémons :', this.pokemonsSignal());
    console.log('Pokémons alpha :', this.pokemonsAlpha());

    //this.dailyPokemon = this.pokemonsRanking()[this.dailyPokemonIndex()];
    this.dailyPokemon = this.pokemonsSignal()[10];
    console.log(this.dailyPokemon);

    let same = [];
    for (let i = 0; i < 300; i++) {
      for (let j = 0; j < 300; j++) {
        const p1 = this.pokemonsAlpha()[i];
        const p2 = this.pokemonsAlpha()[j];
        if (i != j 
          && p1.types[0] == p2.types[0]
          && p1.types[1] == p2.types[1]
          && p1.shadow == p2.shadow 
          && isSameFastMoveType(p1, p2)
          && areSameChargedMoveType(p1, p2)[0]
          && areSameChargedMoveType(p1, p2)[1]) {
          same.push([p1, p2]);
        }
      }
    }
    console.log('Number of similar pokémon', same);
  });

  ngOnInit(): void {
    this.filteredOptions = this.pokemonCtrl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.pokemonsAlpha().slice();
      }),
    );
  }

  displayFn(pokemon: Pokemon): string {
    return [pokemon.name, pokemon.region].filter(str => str).join(' ');
  }
  
  private _filter(name: string): Pokemon[] {
    const filterValue = name.toLowerCase();

    return this.pokemonsAlpha().filter(option => option.name.toLowerCase().includes(filterValue));
  }

  getPokemonIconUrl(pokemon: Pokemon): string {
    const formattedName = [pokemon.name, pokemon.region].filter(str => str).join('-').toLowerCase();
    return `https://img.pokemondb.net/sprites/home/normal/${formattedName}.png`;
  }

  guess(pokemon: Pokemon) {
    if (!this.guessedPokemons.find(p => p.name === pokemon.name && p.region === pokemon.region)) {
      this.guessedPokemons.push(pokemon);
    } else {
      console.error('You already guessed this pokémon'); // TODO : Message d'erreur sur l'interface
    }
    this.pokemonCtrl.setValue('');
  }

  dailyPokemonIndex(): number {
    const seed = new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"
    let hash = 0;

    for (let i = 0; i < seed.length; i++) {
      hash = seed.charCodeAt(i) + ((hash << 5) - hash);
      hash |= 0; // Convert to 32bit integer
    }

    const x = Math.sin(hash) * 10000;
    const rand = x - Math.floor(x);
    return Math.floor(rand * 20); // nombre entier entre 0 et 20 exclu, TODO : valeur max à définir (300)
  }

  getScoreClass(score: number): string {
    if (score === this.dailyPokemon.score) return 'green-cell';
    else if (Math.abs(score - this.dailyPokemon.score) < 0.5) return 'orange-cell';
    else return 'red-cell';
  }

  getFastMoveTypeClass(pokemon: Pokemon): string { 
    return isSameFastMoveType(pokemon, this.dailyPokemon) ? 'green-cell' : 'red-cell';
  }
  
  getChargedMove1TypeClass(pokemon: Pokemon): string {
    return areSameChargedMoveType(pokemon, this.dailyPokemon)[0] ? 'green-cell' : 'red-cell';
  }

  getChargedMove2TypeClass(pokemon: Pokemon): string {
    return areSameChargedMoveType(pokemon, this.dailyPokemon)[1] ? 'green-cell' : 'red-cell';
  }

  getTypeSource(type: string): string {
    return 'assets/type-' + type.toLowerCase() + '-32px.png';
  }

  getShadowClass(isShadow: boolean): string { 
    return isShadow == this.dailyPokemon.shadow ? 'green-cell' : 'red-cell';
  }
    
  getTypeClass(pokemon: Pokemon, index: number): string { 
    return pokemon.types[index] == this.dailyPokemon.types[index] ? 'green-cell' : 'red-cell';
  }

  getImgStyleFromId(dex: number) {
    const x = Math.floor(dex / 12);
    const y = dex % 12;
    const width =  x * 30;
    const height = y * 40;
    return "background:transparent url(assets/pokemonicons-sheet.png) no-repeat scroll -" 
      + height.toString() + "px -" + width.toString() + "px;height:30px;width:40px;";
  }

  getMatchupClass(pokemon: Pokemon): string {
    return pokemon.matchup == this.dailyPokemon.matchup ? 'green-cell' : 'red-cell';
  }

  getCounterClass(pokemon: Pokemon): string {
    return pokemon.counter == this.dailyPokemon.counter ? 'green-cell' : 'red-cell';
  }
}
