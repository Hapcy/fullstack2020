import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  currentGreetingIndex: number = 0;

  get greeting(): string {
    return this.greetings[this.currentGreetingIndex];
  }

  private greetings: string[] = ['Hello world!', 'Helló világ!'];

  changeGreeting(): void {
    this.currentGreetingIndex =
      (this.currentGreetingIndex + 1) % this.greetings.length;
  }

  ngOnInit(): void {
    setTimeout(() => this.changeGreeting(), 5000);
  }
}
