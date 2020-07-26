import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDataService } from '../user-data.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {
  hash: any;
  constructor(private route: ActivatedRoute,
    private router:Router,
    private http: UserDataService,
    private notification: NotificationService) {
    this.hash = this.route.snapshot.data.hash;
  }

  ngOnInit(): void {
      this.http.confirm(this.hash).subscribe(({ code }) => {
      this.notification.open({
        data: "Email was confirmed succesfully. You can log in."
      });
    }, (e) => {
      this.notification.open({
        data: { message: e.result, status: false }
      });
      this.router.navigate(['/'])
    })
  }

}
