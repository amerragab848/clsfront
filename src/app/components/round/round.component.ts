import { Component, OnInit } from '@angular/core';
import {RoundService} from 'src/app/core/services/round/round.service';
import {ToastService} from 'src/app/core/services/toast/toast.service';
import {BranchService} from 'src/app/core/services/branch/branch.service';
import {LabService} from 'src/app/core/services/lab/lab.service';
import {InstructorService} from 'src/app/core/services/instructor/instructor.service';
import {DeliveryTypeService} from 'src/app/core/services/deliver-type/delivery-type.service';
import {CourseTypeService} from 'src/app/core/services/course-type/course-type.service';
import { ActivatedRoute,Router } from '@angular/router';
import { from } from 'rxjs';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-round',
  templateUrl: './round.component.html',
  styleUrls: ['./round.component.css']
})
export class RoundComponent implements OnInit {
  instructors : any[]=[];
  selectedInstructors = [];

  branches : any[];
  labs : any[];
  deliveryTypes:any[];
  courseTypes:any[];

  roundWithDetails : any = {
    roundDetils : null,
    instructors : null
  };
  rounds :any[];
  round : Round = <Round>{};
  roundWeek : WeekDay[] = [];
  weekDay :WeekDay =<WeekDay>{};
  times : Time[] = [
    {
      time : "07:00 AM",
      priority :1
    },
    {
      time : "07:30 AM",
      priority :2
    },
    {
      time : "08:00 AM",
      priority :3
    },
    {
      time : "08:30 AM",
      priority :4
    },
    {
      time : "09:00 AM",
      priority :5
    },
    {
      time : "09:30 AM",
      priority :6
    },
    {
      time : "10:00 AM",
      priority :7
    },
    {
      time : "10:30 AM",
      priority :8
    },
    {
      time : "11:00 AM",
      priority :9
    },
    {
      time : "11:30 AM",
      priority :10
    },
    {
      time : "12:00 PM",
      priority :11
    },
    {
      time : "12:30 PM",
      priority :12
    },
    {
      time : "01:00 PM",
      priority :13
    },
    {
      time : "01:30 PM",
      priority :14
    },
    {
      time : "02:00 PM",
      priority :15
    },
    {
      time : "02:30 PM",
      priority :16
    },
    {
      time : "03:00 PM",
      priority :17
    },
    {
      time : "03:30 PM",
      priority :18
    },
    {
      time : "04:00 PM",
      priority :19
    },
    {
      time : "04:30 PM",
      priority :20
    },
    {
      time : "05:00 PM",
      priority :21
    },
    {
      time : "05:30 PM",
      priority :22
    },
    {
      time : "06:00 PM",
      priority :23
    },
    {
      time : "06:30 PM",
      priority :24
    },
    {
      time : "07:00 PM",
      priority :25
    },
    {
      time : "07:30 PM",
      priority :26
    },
    {
      time : "08:00 PM",
      priority :27
    },
    {
      time : "08:30 PM",
      priority :28
    },
    {
      time : "09:00 PM",
      priority :29
    },
    {
      time : "09:30 PM",
      priority :30
    },
    {
      time : "10:00 PM",
      priority :31
    },
    {
      time : "10:30 PM",
      priority :32
    },
    {
      time : "11:00 PM",
      priority :33
    },
    {
      time : "11:30 PM",
      priority :34
    },
    {
      time : "12:00 AM",
      priority :34
    },
    {
      time : "12:30 AM",
      priority :35
    },
    {
      time : "01:00 AM",
      priority :36
    },
    {
      time : "01:30 AM",
      priority :37
    },
    {
      time : "02:00 AM",
      priority :38
    }
  ];
  constructor(
    private _roundSrv : RoundService,
    private router : ActivatedRoute,
    private _toastSrv : ToastService,
    private _labSrv : LabService,
    private _branchSrv : BranchService,
    private _deliveryTypeSrv : DeliveryTypeService,
    private _courseTypeSrv : CourseTypeService,
    private _instructorSrv : InstructorService,

  ) { 

  }

  ngOnInit() {
    this.GetBranches();
    this.GetCourseTypes();
    this.GetDeliveryTypes();
    this.GetInstructors();
    this.GetCourseRounds();
  }

  GetRoundDetails(roundId)
  {
     this._roundSrv.GetRoundDetails(roundId).subscribe((data : any)=>{
        this.roundWithDetails = data.result;
        console.log(this.roundWithDetails);
     });
  }

  GetCourseRounds()
  {
    this._roundSrv.GetCourseRounds(this.router.snapshot.params.id).subscribe((data : any)=>{
      this.rounds = data.result;
      console.log(data);
    });
  }
  SaveRound(){
    this._roundSrv.SaveRound({
      startDate:this.round.startDate,
      endDate:this.round.endDate,
      roundDetails : this.roundWeek,
      roundDuration:this.round.roundDuration,
      sessionDuration:this.round.sessionDuration,
      totalSessions:this.round.totalSessions,
      courseId: parseFloat(this.router.snapshot.params.id),
      labId:this.round.labId,
      deliveryTypeId:this.round.deliveryTypeId,
      courseTypeId:this.round.courseTypeId,
      selectedInstructors : this.selectedInstructors
    }).subscribe((data : any)=>{
      if(data.code === 200){
        this._toastSrv.success("","Saved Successfully");
        this.ClearRound();
      }
    });
  }
  ExecuteRound(roundId){
    this._roundSrv.ExecuteRound(roundId).subscribe((data : any)=>{
      if(data.code === 200){
        this._toastSrv.success("","Saved Successfully");
        this.GetCourseRounds();
      }
      if(data.code === 500)
        {
          this._toastSrv.error("Failed",data.message);
        }
      }
    );
  }

  
  
  DeleteRound(roundId){
    this._roundSrv.DeleteRound(roundId).subscribe((data : any)=>{
      if(data.code === 200){
        this._toastSrv.success("","Deleted Successfully");
        this.GetCourseRounds();
      }
    });
  }
  ClearRound(){
    this.round = <Round>{};
    this.selectedInstructors =[];
    this.roundWeek =[];
    this.GetCourseRounds();
  }
  CalculateEndDate()
  {
    this.round.totalSessions =this.round.roundDuration /this.round.sessionDuration;
     let weeks = this.round.totalSessions / this.roundWeek.length;
    this._roundSrv.GetRoundEndDate(this.round.startDate,parseFloat(weeks.toString())).subscribe((data:any)=>{
      console.log(data);
      this.round.endDate =data;
    });
  }
  AddDayToRoundWeek()
  {
    if(this.roundWeek.filter(d=>d.day == this.weekDay.day).length == 0 && this.weekDay.day != undefined && this.times.find(x=>x.time == this.weekDay.startTime).priority < this.times.find(x=>x.time == this.weekDay.endTime).priority)
    {
      this.roundWeek.push(this.weekDay);
      this.ClearDay();
    }
  }
  DeleteDayFromRoundWeek(day){
    this.roundWeek.splice(this.roundWeek.indexOf(day),1);
  }
  ClearDay()
  {
    this.weekDay = <WeekDay>{};
  }

  GetBranches() {
    this._branchSrv.GetBranches().subscribe((data :any)=>{
       this.branches = data.result;
    }); 
  }
  GetLabs(id) {
    this._labSrv.GetLabs().subscribe((data :any)=>{
       this.labs = data.result.filter(l=> l.branchId == id);
    }); 
  } 
  GetDeliveryTypes()
  {
    this._deliveryTypeSrv.GetDeliveryTypes().subscribe((data :any)=>{
      this.deliveryTypes = data.result;
   }); 
  }
  GetCourseTypes()
  {
    this._courseTypeSrv.GetCourseTypes().subscribe((data :any)=>{
      this.courseTypes = data.result;
   }); 
  }
  GetInstructors()
  {
    this._instructorSrv.GetInstructors().subscribe((data :any)=>{
      this.instructors = data.result;
   }); 
  }
  SelectInstrctor()
  {
  }
}

export interface WeekDay
{
  day:string;
  startTime:string;
  endTime:string;
}

export interface  Round
{
  roundDuration : number;
  sessionDuration :number;
  totalSessions : number;
  startDate :  Date;
  endDate : DataCue; 
  courseId:number;
  labId:number;
  courseTypeId:number;
  deliveryTypeId:number;
  IsExecuted:boolean;
  roundDetails : WeekDay[];
  instructorsIds : number[]
}

export interface Time{
  time:string;
  priority : number;
}