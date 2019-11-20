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
    const observer = {
      next: (val: string) => console.log('next - 🚀', val),
      error: (err: any) => console.log('error - 🚨', err),
      complete: () => console.log('complete! - 👍')
    };

    const observable = new Observable(subscriber => {
      let count = 0;
      const myInterval = setInterval(() => {
        subscriber.next(count);
        count++;
        if (count > 4) {
          subscriber.complete();
        }
      }, 1000);

      return () => {
        console.log('called and clearing interval');
        clearInterval(myInterval);
      };
    });

    console.log('🏁');
    observable.subscribe(observer);
    console.log('✋');

    // observable.subscribe(
    //   test => console.log(`Iam with ${test}`),
    //   err => console.error(`Im an Error ${err}`),
    //   () => console.log('finally Iam completed')
    // );
  }
}
