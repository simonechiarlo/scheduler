enum Week {
    Monday = 0,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday,
  }
  
  interface GUser {
      id       : Number,
      Password : String,
      Email    : String,
        Admin    : Boolean
  }
  
  interface Teacher {
    TeacherID: number;
    Name: string;
    Surname: string;
    SubstitutionDone: number;
    Courses: Course[];
  }
  
  interface Absence {
    Day: number;
    Hour: number;
    SubjectName: String;
    CourseYear: number;
    CourseSection: String;
    Substitution: {
      Mode: string;
    };
    Teacher: {
      Name: String;
      Surname: String;
    };
  }
  
  interface Substitution {
    SubstitutionID: number;
    IsPosponedEntryOrEarlyExit: boolean;
    TeacherID: number;
  }
  
  interface Course {
    Section: string;
    Year: number;
    IsSubsidiary: boolean;
  }
  
  interface Subject {
    Name: string;
  }
  
  interface Teaching {
    TeachingID: number;
    Hour: number;
    Day: number;
    TeacherID: number;
    SubjectName: string;
    CourseSection: number;
    CourseYear: number;
  }
  
  interface DBRequest {
    name: string;
    args?: any[];
  }
  
  type AbsenceCardProps = {
    ID            : number,
    StartingTime  : string,
    EndingTime    : string,
    Day           : number, 
    Hour          : number, 
    SubjectName   : string, 
    CourseYear    : number, 
    CourseSection : string,
    Substitution  : {
        Mode           : "pending" | "done" | "notNeeded",
        IsPostponedEntryOrEarlyExit : boolean | undefined,
        TeacherName    : string | undefined,
        TeacherSurname : string | undefined
    },
    Teacher       : {
        Name      : string,
        Surname   : string
    },
    PossibleSostitutions : Array<{
        TeacherID : number, 
        Name      : string,
        Surname   : string, 
        SubstitutionDone  : number, 
        Courses   : [{ CourseYear : number, CourseSection : string } ]
    }>
  }
  
  export type {
    AbsenceCardProps,
    Teacher,
    Absence,
    Substitution,
    Course,
    Subject,
    Teaching,
    DBRequest,
    GUser
  };
  export { Week };
  