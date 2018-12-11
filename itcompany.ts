function uuid() {
  let i, random;
  let uuid = '';
  for (i = 0; i < 32; i++) {
    random = Math.random() * 16 | 0;
    if (i === 8 || i === 12 || i === 16 || i === 20) {
      uuid += '1';
    }
    uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
  }
  return uuid;
}

class Project {
  private id: string;
  private type: string;
  private complexity: number;
  private status: string;
  private busyDays: number;

  constructor(status: string = 'free', busyDays: number = 0) {
    this.id = uuid();
    this.type = this.setType();
    this.complexity = this.setComplexity();
    this.status = status;
    this.busyDays = busyDays;
  }

  public setType(): string {
    let typeArray = ['web', 'mob'];
    return typeArray[Math.floor(Math.random() * typeArray.length)];
  }

  public getType(): string {
      return this.type;
  }

  public setStatus(status: string): void {
    this.status = status;
  }

  public  getStatus(): string {
      return this.status;
  }

  public decrementBusyDays(): void {
    this.busyDays -= 1;
  }

  public setBusyDays(complexity: number): void {
    this.busyDays = complexity;
  }

  public developmentProject(): void {
    (this.busyDays > 0) ? this.setStatus('busy') : this.setStatus('completed');
  }

  public developmentOfQa(): void {
    (this.busyDays > 0) ? this.setStatus('completed') : this.setStatus('qaApproved');
  }

  public setComplexity(): number {
    let mathComplexity = Math.floor(Math.random() * 3) + 1;
    return mathComplexity;
  }

  public getComplexity(): number {
      return this.complexity;
  }
}

class Director {
  private employees: Array<Employee>;
  private deleteEmployees: number;
  private addEmployees: number;
    constructor(employees: Array<Employee>, deleteEmployees: number = 0, addEmployees: number = 0) {
        this.employees = employees;
        this.deleteEmployees = deleteEmployees;
        this.addEmployees = addEmployees;
    }

    public addEmployee(employees: Array<Employee>, employee: Employee): void {
        employees.push(employee);
        this.incrementAddEmployees();
    }

    public incrementAddEmployees(): void {
        this.addEmployees += 1;
    }

    public getAddEmployees(): number {
        return this.addEmployees;
    }

    public deleteEmployee(id: string): void {
      let index: number=0;
      this.employees.forEach((item, i) => {
        if(item.getId() === id) index = i;
      });
      this.employees.splice(index, 1);
      this.incrementDeleteEmployees();
    }

    public incrementDeleteEmployees(): void {
        this.deleteEmployees += 1;
    }

    public getDeleteEmployees(): number {
        return this.deleteEmployees;
    }

    public getProjects(projects: Array<Project>): void {
        let countPrj = Math.floor(Math.random() * 4);

        for (let i = 0; i <= countPrj; i += 1) {
            projects.push(new Project());
        }
    }
}

class Employee {
  protected id: string;
  protected type: string;
  protected experience: number;
  protected status: string;
  protected busyDays: number;
  protected freeDays: number;

  protected constructor(type: string, experience: number = 0, status: string = 'free',
              busyDays: number = 0, freeDays: number = 0) {
    this.id = uuid();
    this.type = type;
    this.experience = experience;
    this.status = status;
    this.busyDays = busyDays;
    this.freeDays = freeDays;
  }

  public getId(): string {
    return this.id;
  }

  public getType(): string {
      return this.type;
  }

  public getStatus(): string {
      return this.status;
  }

  public getFreeDays(): number {
      return this.freeDays;
  }

  public getExperience(): number {
      return this.experience;
  }

  public incrementExp(): void {
    this.experience += 1;
  }

  public incrementFreeDays(): void {
    this.freeDays += 1;
  }

  public decrementBusyDays(): void {
    this.busyDays -= 1;
  }

  public setStatus(status: string): void {
    this.status = status;
  }

  public resetFreeDays(): void {
    this.freeDays = 0;
  }

  public changeStatusOfBusy(): void {
    if (this.busyDays > 0) {
      this.setStatus('busy');
    } else {
      this.incrementExp();
      this.setStatus('free');
    }
  }

  public getProject(projectComplexity: number): void {
    this.busyDays = projectComplexity;

    this.changeStatusOfBusy();
    this.resetFreeDays();
  }
}

class WebDeveloper extends Employee {
  constructor(type: string = 'web', experience: number = 0, status: string = 'free',
              busyDays: number = 0, freeDays: number = 0) {
    super(type, experience, status, busyDays, freeDays);
    this.id = uuid();
    this.type = type;
  }
}

class MobDeveloper extends Employee {
    constructor(type: string = 'mob', experience: number = 0, status: string = 'free',
                busyDays: number = 0, freeDays: number = 0) {
        super(type, experience, status, busyDays, freeDays);
        this.id = uuid();
        this.type = type;
    }
}

class QaDeveloper extends Employee {
    constructor(type: string = 'qa', experience: number = 0, status: string = 'free',
                busyDays: number = 0, freeDays: number = 0) {
        super(type, experience, status, busyDays, freeDays);
        this.id = uuid();
        this.type = type;
    }
}

class Department {
  protected developers: Array<Employee>;
  protected projects: Array<Project>;
  protected needDevelopers: number;
  protected type: string;
  protected constructor(employees: Array<Employee>, projects: Array<Project>,
                needDevelopers: number = 0, type: string) {
        this.developers = employees;
        this.projects = projects;
        this.needDevelopers = needDevelopers;
        this.type = type;
    }

    public getDevelopers(): Array<Employee> {
        return this.developers.filter(item => item.getType() === this.type);
    }

    public getProjects(): Array<Project> {
        return this.projects.filter(item => item.getType() === this.type);
    }

    public getDevelopersFree(): Array<Employee> {
        return this.developers.filter(item => item.getType() === this.type && item.getStatus() === 'free');
    }

    public getDevelopersBusy(): Array<Employee> {
        return this.developers.filter(item => item.getType() === this.type && item.getStatus() === 'busy');
    }

    public getProjectsFree(): Array<Project> {
        return this.projects.filter(item => item.getType() === this.type && item.getStatus() === 'free');
    }

    public getProjectsBusy(): Array<Project> {
        return this.projects.filter(item => item.getType() === this.type && item.getStatus() === 'busy');
    }

    public resetNeedDevelopers(): void {
        this.needDevelopers = 0;
    }

    public getNeedDevelopers(): number {
        return this.needDevelopers;
    }

    public incrementNeedDevelopers(): void {
        this.needDevelopers += 1;
    }
}

class WebDepartment extends Department {
    constructor(employees: Array<Employee>, projects: Array<Project>,
                needDevelopers: number = 0, type: string = 'web') {
        super(employees, projects, needDevelopers, type);
    }

    public getEmployeesForDelete(): Array<Employee> {
        function compareExperience(employee1: Employee, employee2: Employee) {
            return employee1.getExperience() - employee2.getExperience();
        }
        return this.developers
            .filter(item => item.getStatus() === 'free' && item.getFreeDays() > 2)
            .sort(compareExperience);
    }

    public developmentWebProjects(): void {
        this.getProjectsFree().forEach((itemWebProject) => {
            if (this.getDevelopersFree().length > 0) {
                itemWebProject.setBusyDays(itemWebProject.getComplexity());
                itemWebProject.developmentProject();
                this.getDevelopersFree()[0].getProject(itemWebProject.getComplexity());
            } else {
                this.incrementNeedDevelopers();
            }
        });

        this.getDevelopersFree().forEach((itemFreeDevelopers) => {
            itemFreeDevelopers.incrementFreeDays();
        });

        this.getProjectsBusy().forEach((itemBusyProject) => {
            itemBusyProject.decrementBusyDays();
            itemBusyProject.developmentProject();
        });

        this.getDevelopersBusy().forEach((itemBusyDevelopers) => {
            itemBusyDevelopers.decrementBusyDays();
            itemBusyDevelopers.changeStatusOfBusy();
        });
    }
}

class MobDepartment extends Department {
  constructor(employees: Array<Employee>, projects: Array<Project>,
              needDevelopers: number = 0, type: string = 'mob') {
    super(employees, projects, needDevelopers, type);
  }

  public getEmployeesForDelete(): Array<Employee> {
    function compareExperience(employee1: Employee, employee2: Employee) {
      return employee1.getExperience() - employee2.getExperience();
    }

    return this.developers
      .filter(item => item.getStatus() === 'free' && item.getFreeDays() > 2)
      .sort(compareExperience);
  }

  public developmentMobProjects(): void {
    this.getProjectsFree().forEach((itemMobProject) => {
      if (this.getDevelopersFree().length >= itemMobProject.getComplexity()) {
        itemMobProject.setBusyDays(1);
        itemMobProject.developmentProject();
        for (let i = 0; i < itemMobProject.getComplexity(); i += 1) {
          this.getDevelopersFree()[0].getProject(1);
        }
      } else {
        for (let i = 0; i < itemMobProject.getComplexity(); i += 1) {
          this.incrementNeedDevelopers();
        }
      }
    });

    this.getDevelopersFree().forEach((itemFreeDevelopers) => {
      itemFreeDevelopers.incrementFreeDays();
    });

    this.getProjectsBusy().forEach((itemBusyProject) => {
      itemBusyProject.decrementBusyDays();
      itemBusyProject.developmentProject();
    });
    this.getDevelopersBusy().forEach((itemBusyDevelopers) => {
      itemBusyDevelopers.decrementBusyDays();
      itemBusyDevelopers.changeStatusOfBusy();
    });
  }
}

class QaDepartment extends Department {
  constructor(employees: Array<Employee>, projects: Array<Project>,
              needDevelopers: number = 0, type: string = 'qa') {
    super(employees, projects, needDevelopers, type);
  }

  public getQaProjects(): Array<Project> {
    return this.projects.filter(item => item.getStatus() === 'completed');
  }

  public getQaApprovedProjects(): Array<Project> {
    return this.projects.filter(item => item.getStatus()=== 'qaApproved');
  }


  public getEmployeesForDelete(): Array<Employee> {
    function compareExperience(employee1: Employee, employee2: Employee) {
      return employee1.getExperience()- employee2.getExperience();
    }

    return this.developers
      .filter(item => item.getStatus() === 'free' && item.getFreeDays() > 2)
      .sort(compareExperience);
  }

  public developmentQaProjects(): void {
    this.getQaProjects().forEach((itemQaProject) => {
      if (this.getDevelopersFree().length > 0) {
        itemQaProject.setBusyDays(0);
        itemQaProject.developmentOfQa();
        this.getDevelopersFree()[0].getProject(1);
      } else {
        this.incrementNeedDevelopers();
      }
    });

    this.getDevelopersFree().forEach((itemFreeDevelopers) => {
      itemFreeDevelopers.incrementFreeDays();
    });

    this.getQaProjects().forEach((itemBusyProject) => {
      itemBusyProject.developmentOfQa();
    });

    this.getDevelopersBusy().forEach((itemBusyDevelopers) => {
      itemBusyDevelopers.decrementBusyDays();
      itemBusyDevelopers.changeStatusOfBusy();
    });
  }
}

class Company {
  private employees: Array<Employee>;
  private projects: Array<Project>;
  public director: Director;
  public webDepartment: WebDepartment;
  public mobDepartment: MobDepartment;
  public qaDepartament: QaDepartment;

  constructor() {
    this.employees = [];
    this.projects = [];
    this.director = new Director(this.getEmployees());
    this.webDepartment = new WebDepartment(this.getEmployees(), this.getProjects());
    this.mobDepartment = new MobDepartment(this.getEmployees(), this.getProjects());
    this.qaDepartament = new QaDepartment(this.getEmployees(), this.getProjects());
  }

  public getEmployees(): Array<Employee> {
    return this.employees;
  }

  public getProjects(): Array<Project> {
    return this.projects;
  }

  public work(allDays): void {
    for (let i = 1; i <= allDays; i += 1) {
      this.director.getProjects(this.getProjects());

      this.webDepartmentWork();
      this.mobDepartmentWork();
      this.qaDepartmentWork();
    }
    this.getStatistica(allDays);
  }

  public webDepartmentWork(): void {
    this.webDepartment.developmentWebProjects();
    for (let i = 0; i < this.webDepartment.getNeedDevelopers(); i += 1) {
      this.director.addEmployee(this.employees, new WebDeveloper());
    }
    this.webDepartment.resetNeedDevelopers();
    if (this.webDepartment.getEmployeesForDelete().length > 0) {
      this.director.deleteEmployee(this.webDepartment.getEmployeesForDelete()[0].getId());
    }
  }

  public mobDepartmentWork(): void {
    this.mobDepartment.developmentMobProjects();
    for (let i = 0; i < this.mobDepartment.getNeedDevelopers(); i += 1) {
      this.director.addEmployee(this.employees, new MobDeveloper());
    }
    this.mobDepartment.resetNeedDevelopers();

    if (this.mobDepartment.getEmployeesForDelete().length > 0) {
      this.director.deleteEmployee(this.mobDepartment.getEmployeesForDelete()[0].getId());
    }
  }

  public qaDepartmentWork(): void {
    if (this.qaDepartament.getQaProjects().length > 0) {
      this.qaDepartament.developmentQaProjects();
      for (let i = 0; i < this.qaDepartament.getNeedDevelopers(); i += 1) {
        this.director.addEmployee(this.employees, new QaDeveloper());
      }
      this.qaDepartament.resetNeedDevelopers();
      if (this.qaDepartament.getEmployeesForDelete().length > 0) {
        this.director.deleteEmployee(this.qaDepartament.getEmployeesForDelete()[0].getId());
      }
    }
  }

  public getStatistica(allDays): void {
    console.log(`Фирма работает:          ${allDays}`);
    console.log(`Выполнено проектов:      ${this.qaDepartament.getQaApprovedProjects().length}`);
    console.log(`Принято разработчиков:   ${this.director.getAddEmployees()}`);
    console.log(`Уволено разработчиков:   ${this.director.getDeleteEmployees()}`);
  }
}

const company = new Company();

company.work(365);