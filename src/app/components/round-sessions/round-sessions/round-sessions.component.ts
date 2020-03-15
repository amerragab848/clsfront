import { Component, OnInit } from '@angular/core';
import { RoundService } from 'src/app/core/services/round/round.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-round-sessions',
  templateUrl: './round-sessions.component.html',
  styleUrls: ['./round-sessions.component.css']
})
export class RoundSessionsComponent implements OnInit {

  sessions : any[];
  constructor(  private _roundSrv : RoundService,
    private router : ActivatedRoute
    ) { }

  ngOnInit() {
    this.GetRoundSessions();
  }

  GetRoundSessions()
  {
     this._roundSrv.GetRoundSessions(this.router.snapshot.params.id).subscribe((data : any)=>{
        this.sessions = data.result;
     });
  }

}
