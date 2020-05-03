import {
  Component,
  ElementRef,
  Input,
  AfterViewInit,
  ViewChild,
} from "@angular/core";

@Component({
  selector: 'animated-digit',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements AfterViewInit {
  @Input() duration: number;
  @Input() digit: number;
  @Input() steps: number;
  @Input() countertitle: string;
  @Input() countercolor: string;
  @ViewChild("animatedDigit") animatedDigit: ElementRef;

  constructor() { }

  ngAfterViewInit() {
    if (this.digit) {
      this.animateCount();
    }
  }

  public animateCount() {
    if (!this.duration) {
      this.duration = 1000;
    }

    if (typeof this.digit === "number") {
      this.counterFunc(this.digit, this.duration,this.animatedDigit);
    }
  }

  counterFunc(endValue, durationMs,element) {
    if (!this.steps) {
      this.steps = 12;
    }

    const stepCount = Math.abs(durationMs / this.steps);
    const valueIncrement = (endValue - 0) / stepCount;
    const sinValueIncrement = Math.PI / stepCount;

    let currentValue = 0;
    let currentSinValue = 0;

    function step() {
      currentSinValue += sinValueIncrement;
      currentValue += valueIncrement * Math.sin(currentSinValue) ** 2 * 2;

      element.nativeElement.textContent = Math.abs(Math.floor(currentValue));


      if (currentSinValue < Math.PI) {
        window.requestAnimationFrame(step);
      }
    }

    step();
  }

}
