import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'receipe-app';

  featureSelected = 'recipes';

  onFeatureSelected(featureName: string) {
    this.featureSelected = featureName;
  }
}
