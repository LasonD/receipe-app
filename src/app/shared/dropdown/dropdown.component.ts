import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {
  name: string;
  show: boolean = false;

  constructor() { }

  ngOnInit(): void {

  }

  onToggleClick() {
    this.show = !this.show;
  }
}
