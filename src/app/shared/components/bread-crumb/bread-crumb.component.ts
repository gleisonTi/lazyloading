import { Component, OnInit, Input, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';

interface BreadCrumbItem {
  label: string;
  url?: string;
}

@Component({
  selector: 'incca-bread-crumb',
  templateUrl: './bread-crumb.component.html',
  styleUrls: ['./bread-crumb.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class BreadCrumbComponent implements OnInit, AfterViewInit {

  public breadcrumbs$:any
  @Input() items: Array<BreadCrumbItem> = [];

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {


  }

  ngAfterViewInit(): void {
    this.breadcrumbs$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(event => this.buildBreadCrumb(this.activatedRoute.root))
    );

  }

  // isTheLastItem(item: BreadCrumbItem): boolean {
  //   const index = this.items.indexOf(item);
  //   return index + 1 === this.items.length;
  // }

  buildBreadCrumb(route: ActivatedRoute, url: string = '',
    breadcrumbs: Array<BreadCrumbItem> = []): Array<BreadCrumbItem> {
    // If no routeConfig is avalailable we are on the root path

    console.log(route.routeConfig)
    const label = route.routeConfig ? route.routeConfig.data['breadcrumb'] :null
    const path = route.routeConfig ? route.routeConfig.path : '';
    // In the routeConfig the complete path is not available,
    // so we rebuild it each time
    const nextUrl = `${url}${path}/`;
    const breadcrumb = {
      label: label,
      url: nextUrl,
    };
    const newBreadcrumbs = [...breadcrumbs, breadcrumb];
    if (route.firstChild) {
      // If we are not on our current path yet,
      // there will be more children to look after, to build our breadcumb
      return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }
    return newBreadcrumbs;
  }

}
