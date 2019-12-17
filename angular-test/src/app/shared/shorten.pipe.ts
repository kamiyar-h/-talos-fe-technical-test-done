import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {
  defaultLimit = 15;
  transform(value: string, limit?: number): any {
    if (!value) {
      return null;
    }

    const newLimit = limit ? limit : this.defaultLimit;
    if (value.length > newLimit) {
      return value.substr(0, newLimit) + '...';
    }

    return value;
  }

}
