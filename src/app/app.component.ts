import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'vettri-velan';

  ngOnInit(): void {
    this.section1();
  }

  section1() {
    const observable = new Observable(subscriber => {
      subscriber.next('Hello');
      subscriber.next('World');
      subscriber.complete();
    });

    // const observer = {
    //   next: (val: string) => console.log('next - 🚀', val),
    //   error: (err: any) => console.log('error - 🚨', err),
    //   complete: () => console.log('complete! - 👍')
    // };

    // observable.subscribe(observer);

    observable.subscribe(
      test => console.log(`Iam with ${test}`),
      err => console.error(`Im an Error ${err}`),
      () => console.log('finally Iam completed')
    );
  }
}
