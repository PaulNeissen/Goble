import { Component, computed, effect, inject, OnInit, Signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { areSameChargedMoveType, isSameFastMoveType, Pokemon, shareOneType } from '../../domain/Pokemon';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { map, Observable, startWith } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { POKEMON_PORT } from '@/injection.token';
import { Move } from '@/goble/domain/Move';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { SPECIAL_POKEMON_COORDINATES } from './pokemon-icon-coordinates';

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
  // Critères ajoutable : le stade d'évolution grace à l'attribut family

  pokemonCtrl = new FormControl<string | Pokemon>('');
  filteredOptions: Observable<Pokemon[]> | undefined;
  headers: string[] = ['Pokémon', 'Rank', 'Type 1', 'Type 2', 'Shadow', 'Fast Move', 'Turn', 'Charged 1', 'Charged 2', 'Key win', 'Key loss'];
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

    this.dailyPokemon = this.pokemonsSignal()[10]; //this.dailyPokemonIndex()
    console.log(this.dailyPokemon);

    let same = [];
    for (let i = 0; i < this.pokemonsAlpha().length; i++) {
      for (let j = 0; j < this.pokemonsAlpha().length; j++) {
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
    // console.log('Number of similar pokémon', same);
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
    if (!pokemon || !pokemon.name) {
      return '';
    }
    const capitalized = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    return pokemon.region ? `${capitalized} (${pokemon.region})` : capitalized;
  }
  
  private _filter(name: string): Pokemon[] {
    const filterValue = name.toLowerCase();

    return this.pokemonsAlpha().filter(option => option.name.toLowerCase().includes(filterValue));
  }

  getPokemonIconUrl(pokemon: Pokemon): string {
    let formattedName = [pokemon.name, pokemon.region].filter(str => str).join('-').toLowerCase();

    if (pokemon.region === 'combat') // Tauros
      formattedName = 'tauros-paldean-combat';

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

  getRankClass(rank: number): string {
    if (rank === this.dailyPokemon.rank) return 'green-cell';
    else if (Math.abs(rank - this.dailyPokemon.rank) < 5) return 'orange-cell';
    else return 'red-cell';
  }

  getFastMoveTypeClass(pokemon: Pokemon): string { 
    return isSameFastMoveType(pokemon, this.dailyPokemon) ? 'green-cell' : 'red-cell';
  }

  getFastMoveTurnClass(pokemon: Pokemon): string {
    if (pokemon.fastMove.turn === this.dailyPokemon.fastMove.turn) return 'green-cell';
    else if (Math.abs(pokemon.fastMove.turn - this.dailyPokemon.fastMove.turn) <= 1) return 'orange-cell';
    else return 'red-cell';
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

  getImgStyleFromId(pokemon: Pokemon, x?: number, y?: number) {
    if (pokemon.region) {
      // Tauros
      if (pokemon.region === 'combat') {
        x = 104;
        y = 8;
      } else if (pokemon.region === 'blaze') {
        x = 104;
        y = 9;
      } else if (pokemon.region === 'aqua') {
        x = 104;
        y = 10;
      }

      // Zygarde
      if (pokemon.region === '10') {
        x = 97,
        y = 6;
      }

      const specialPoke = SPECIAL_POKEMON_COORDINATES.find(p => p.dex === pokemon.dex);
      if (specialPoke) {
        x = specialPoke.x;
        y = specialPoke.y;
      }
    }

    x = x ?? Math.floor(pokemon.dex / 12);
    y = y ?? pokemon.dex % 12;
    const width =  x * 30;
    const height = y * 40;
    return "background:transparent url(assets/pokemonicons-sheet.png) no-repeat scroll -" 
      + height.toString() + "px -" + width.toString() + "px;height:30px;width:40px;";
  }

  getMatchupClass(pokemon: Pokemon): string {
    if (pokemon.matchup.name === this.dailyPokemon.matchup.name) {
      return 'green-cell';
    } else if (shareOneType(pokemon.matchup, this.dailyPokemon.matchup)) {
      return 'orange-cell';
    }
    return 'red-cell';
  }

  getCounterClass(pokemon: Pokemon): string {
    if (pokemon.counter.name === this.dailyPokemon.counter.name) {
      return 'green-cell';
    } else if (shareOneType(pokemon.counter, this.dailyPokemon.counter)) {
      return 'orange-cell';
    }
    return 'red-cell';
  }
}
