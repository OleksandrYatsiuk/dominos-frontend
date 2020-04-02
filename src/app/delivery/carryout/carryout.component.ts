import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MapComponent } from 'src/app/shared/components/map/map.component';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-carryout',
  templateUrl: './carryout.component.html',
  styleUrls: ['./carryout.component.scss']
})
export class CarryoutComponent implements OnInit {
  carryOut: FormGroup;
  public username: any;
  constructor(private formBuilder: FormBuilder, public dialog: MatDialog, private user: UserService) { }

  ngOnInit() {
    this.user.currentUser.subscribe(user => this.username = user);

    this.carryOut = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.maxLength(15)]],
      phone: ["", [Validators.required, Validators.pattern("[0-9]{10}")]],
      email: ["", [Validators.required, Validators.email]],
      restaurant: this.formBuilder.group({
        restaurant: ["", [Validators.required]],
        comment: ["", []],
      }),
      date: this.formBuilder.group({
        date: ["", [Validators.required]],
        time: ["", [Validators.required]],
      }),
      payment: this.formBuilder.group({
        coupon: ["", []],
        remainder: ["", []],
        type: ["", [Validators.required]],
      })
    })
  }


  openMap(): void {
    const dialogRef = this.dialog.open(MapComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result) {
        this.carryOut.controls.restaurant['controls'].restaurant.setValue(result.address);
        console.log(this.carryOut.value);
      }

    });
  }


  onSubmit() {
    console.log('submit');
  }
}
