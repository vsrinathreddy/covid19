import { ChangeDetectorRef,Component, OnInit,ViewChild } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {Router} from "@angular/router"
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-site-header',
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.css']
})
export class SiteHeaderComponent implements OnInit {

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,private router: Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  @ViewChild('sidenav', {static: true})
  public sidenav: MatSidenav;
  ngOnInit(): void {

  }
  goToURL(path:string){
    if(path=='dashboard'){
      this.router.navigate(['/dashboard'])
    }
    else if(path=='login'){
      this.router.navigate(['/login'])
    }
    else if(path=='cases'){
      this.router.navigate(['/cases'])
    }

    if(this.mobileQuery.matches){
      this.sidenav.close();
    }
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
