import { Injectable } from '@angular/core';
import { HttpClient }from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

import { LogService } from './log.service';

@Injectable()
export class StarWarsService {
  private characters = [
    { name: 'Luke Skywalker', side: '' },
    { name: 'Darth Vader', side: '' }
  ];
  private logService: LogService;
  charactersChanged = new Subject<void>();
  baseUrl = 'https://swapi.co/api/people/';

  constructor(logService: LogService, private http: HttpClient) {
    this.logService = logService;
  }

 fetchCharacters() {
    this.http.get(this.baseUrl)
      .map((response: any) => {
        const data = response;
        const extractedChars = data.results;
        const chars = extractedChars.map((char) => {
          return {name: char.name, side: ''};
        });
        return chars;
      })
      .subscribe(
        (data) => {
          // console.log(data);
          this.characters = data;
          this.charactersChanged.next();
        }
      );
  }

  getCharacters(chosenList) {
    if (chosenList === 'all') {
      return this.characters.slice();
    }
    return this.characters.filter((char) => {
      return char.side === chosenList;
    })
  }

  onSideChosen(charInfo) {
    const pos = this.characters.findIndex((char) => {
      return char.name === charInfo.name;
    })
    this.characters[pos].side = charInfo.side;
    this.charactersChanged.next();
    this.logService.writeLog('Changed side of ' + charInfo.name + ', new side: ' + charInfo.side);
  }

  addCharacter(name,side) {
    const newChar = {name: name, side:side};
    this.characters.push(newChar);
  }
}



// import { Injectable } from '@angular/core';
// import { HttpClient }from '@angular/common/http';
// import { Subject } from 'rxjs/Subject';
// import 'rxjs/add/operator/map';

// import { LogService } from './log.service';

// @Injectable()
// export class StarWarsService {
//   private characters = [
//     { name: 'Luke Skywalker', side: '' },
//     { name: 'Darth Vader', side: '' }
//   ];
//   baseUrl = 'https://swapi.co/api/people/';
//   charactersChanged = new Subject<void>();

//   constructor(private logService: LogService,private http: HttpClient) {
//   }

//   fetchCharacters() {
//     this.http.get(this.baseUrl)
//       .map((response: any) => {
//         const data = response;
//         const extractedChars = data.results;
//         const chars = extractedChars.map((char) => {
//           return {name: char.name, side: ''};
//         });
//         return chars;
//       })
//       .subscribe(
//         (data) => {
//           console.log(data);
//           this.characters = data;
//           this.charactersChanged.next();
//         }
//       );
//   }

//   getCharacters(chosenList) {
//     if (chosenList === 'all') {
//       return this.characters.slice();
//     }
//     return this.characters.filter((char) => {
//       return char.side === chosenList;
//     })
//   }

//   onSideChosen(charInfo) {
//     const pos = this.characters.findIndex((char) => {
//       return char.name === charInfo.name;
//     })
//     this.characters[pos].side = charInfo.side;
//     this.charactersChanged.next();
//     this.logService.writeLog('Changed side of ' + charInfo.name + ', new side: ' + charInfo.side);
//   }

//   addCharacter(name, side) {
//     const pos = this.characters.findIndex((char) => {
//       return char.name === name;
//     })
//     if (pos !== -1) {
//       return;
//     }
//     const newChar = {name: name, side: side};
//     this.characters.push(newChar);
//   }
// }
