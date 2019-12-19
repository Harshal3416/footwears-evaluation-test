import { Component } from '@angular/core';
import { DataService } from 'src/services/data.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  data: any;
  searchValue: any;
  footware: any = []
  display: Array<string> = [];
  searchValue2: Array<string> = [];
  showValue: boolean;
  values: Array<string> = [];
  removeElements: any;

  constructor(public serviceData: DataService, public toastController: ToastController) { }

  async search() {

    // toast to notify added item
    const toast = await this.toastController.create({
      message: `Added ${this.searchValue}`,
      duration: 3000
    });
    toast.present();
    
    if (!this.values.includes(this.searchValue)) {
      this.serviceData.getData().subscribe(res => {
        this.footware = [...this.footware , Object.entries(res).filter(el => el[0] === this.searchValue)[0]];
        this.values.push(this.searchValue);       
        this.searchValue = '';
      });      
    }
  }

  remove(value,index){
    this.footware = this.footware.filter(el => el[0] != value);
    this.values.splice(index,1);
  }
}
