import { Component, OnInit } from '@angular/core';
import { DataStorageService } from "../services/data-storage.service";
import { AuthService } from "../services/auth.service";
import { User } from "../models/user.model";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: User;
  isLoggedIn = false;

  constructor(private dataStorage: DataStorageService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.user.subscribe(user => {
      this.isLoggedIn = !!user?.token;
      this.user = user;
    });
  }

  saveRecipes() {
    this.dataStorage.saveRecipes();
  }

  fetchRecipes() {
    return this.dataStorage.fetchRecipes().subscribe();
  }

  onLogout() {
    this.authService.logout();
  }
}
