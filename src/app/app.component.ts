import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { routerFadeAnimation } from './animations';
import { PromptUpdateService } from './services/prompt-update.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routerFadeAnimation]
})
export class AppComponent {

  constructor(private pus: PromptUpdateService) { }

  prepareRoute(outlet: RouterOutlet) {
    if (outlet && outlet.isActivated) {
      if (outlet.activatedRouteData['animate'] === false) {
        return "DoNotAnimate";
      }
      return outlet.activatedRoute;
    }
    return null;
  }
}
