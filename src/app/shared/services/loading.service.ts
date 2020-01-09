import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loading: number = 0;

  showLoading() {
    this.loading++;
  }

  hideLoading() {
    this.loading--;
    if (this.loading < 0) {
      this.loading = 0;
    }
  }

  isLoading() {
    return this.loading > 0;
  }


}
