import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  dummy = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.';
  dummyList = [
    'pellentesque eu, pretium quis, sem.',
    'Lorem ipsum dolor sit amet',
    'consectetuer adipiscing elit'
  ];
  constructor() { }

  ngOnInit() {
  }

}
