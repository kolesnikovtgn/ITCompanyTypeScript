var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
function uuid() {
    var i, random;
    var uuid = '';
    for (i = 0; i < 32; i++) {
        random = Math.random() * 16 | 0;
        if (i === 8 || i === 12 || i === 16 || i === 20) {
            uuid += '1';
        }
        uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
    }
    return uuid;
}
var Project = /** @class */ (function () {
    function Project(status, busyDays) {
        if (status === void 0) { status = 'free'; }
        if (busyDays === void 0) { busyDays = 0; }
        this.id = uuid();
        this.type = this.setType();
        this.complexity = this.setComplexity();
        this.status = status;
        this.busyDays = busyDays;
    }
    Project.prototype.setType = function () {
        var typeArray = ['web', 'mob'];
        return typeArray[Math.floor(Math.random() * typeArray.length)];
    };
    Project.prototype.getType = function () {
        return this.type;
    };
    Project.prototype.setStatus = function (status) {
        this.status = status;
    };
    Project.prototype.getStatus = function () {
        return this.status;
    };
    Project.prototype.decrementBusyDays = function () {
        this.busyDays -= 1;
    };
    Project.prototype.setBusyDays = function (complexity) {
        this.busyDays = complexity;
    };
    Project.prototype.developmentProject = function () {
        (this.busyDays > 0) ? this.setStatus('busy') : this.setStatus('completed');
    };
    Project.prototype.developmentOfQa = function () {
        (this.busyDays > 0) ? this.setStatus('completed') : this.setStatus('qaApproved');
    };
    Project.prototype.setComplexity = function () {
        var mathComplexity = Math.floor(Math.random() * 3) + 1;
        return mathComplexity;
    };
    Project.prototype.getComplexity = function () {
        return this.complexity;
    };
    return Project;
}());
var Director = /** @class */ (function () {
    function Director(employees, deleteEmployees, addEmployees) {
        if (deleteEmployees === void 0) { deleteEmployees = 0; }
        if (addEmployees === void 0) { addEmployees = 0; }
        this.employees = employees;
        this.deleteEmployees = deleteEmployees;
        this.addEmployees = addEmployees;
    }
    Director.prototype.addEmployee = function (employees, employee) {
        employees.push(employee);
        this.incrementAddEmployees();
    };
    Director.prototype.incrementAddEmployees = function () {
        this.addEmployees += 1;
    };
    Director.prototype.getAddEmployees = function () {
        return this.addEmployees;
    };
    Director.prototype.deleteEmployee = function (id) {
        var index = 0;
        this.employees.forEach(function (item, i) {
            if (item.getId() === id)
                index = i;
        });
        this.employees.splice(index, 1);
        this.incrementDeleteEmployees();
    };
    Director.prototype.incrementDeleteEmployees = function () {
        this.deleteEmployees += 1;
    };
    Director.prototype.getDeleteEmployees = function () {
        return this.deleteEmployees;
    };
    Director.prototype.getProjects = function (projects) {
        var countPrj = Math.floor(Math.random() * 4);
        for (var i = 0; i <= countPrj; i += 1) {
            projects.push(new Project());
        }
    };
    return Director;
}());
var Employee = /** @class */ (function () {
    function Employee(type, experience, status, busyDays, freeDays) {
        if (experience === void 0) { experience = 0; }
        if (status === void 0) { status = 'free'; }
        if (busyDays === void 0) { busyDays = 0; }
        if (freeDays === void 0) { freeDays = 0; }
        this.id = uuid();
        this.type = type;
        this.experience = experience;
        this.status = status;
        this.busyDays = busyDays;
        this.freeDays = freeDays;
    }
    Employee.prototype.getId = function () {
        return this.id;
    };
    Employee.prototype.getType = function () {
        return this.type;
    };
    Employee.prototype.getStatus = function () {
        return this.status;
    };
    Employee.prototype.getFreeDays = function () {
        return this.freeDays;
    };
    Employee.prototype.getExperience = function () {
        return this.experience;
    };
    Employee.prototype.incrementExp = function () {
        this.experience += 1;
    };
    Employee.prototype.incrementFreeDays = function () {
        this.freeDays += 1;
    };
    Employee.prototype.decrementBusyDays = function () {
        this.busyDays -= 1;
    };
    Employee.prototype.setStatus = function (status) {
        this.status = status;
    };
    Employee.prototype.resetFreeDays = function () {
        this.freeDays = 0;
    };
    Employee.prototype.changeStatusOfBusy = function () {
        if (this.busyDays > 0) {
            this.setStatus('busy');
        }
        else {
            this.incrementExp();
            this.setStatus('free');
        }
    };
    Employee.prototype.getProject = function (projectComplexity) {
        this.busyDays = projectComplexity;
        this.changeStatusOfBusy();
        this.resetFreeDays();
    };
    return Employee;
}());
var WebDeveloper = /** @class */ (function (_super) {
    __extends(WebDeveloper, _super);
    function WebDeveloper(type, experience, status, busyDays, freeDays) {
        if (type === void 0) { type = 'web'; }
        if (experience === void 0) { experience = 0; }
        if (status === void 0) { status = 'free'; }
        if (busyDays === void 0) { busyDays = 0; }
        if (freeDays === void 0) { freeDays = 0; }
        var _this = _super.call(this, type, experience, status, busyDays, freeDays) || this;
        _this.id = uuid();
        _this.type = type;
        return _this;
    }
    return WebDeveloper;
}(Employee));
var MobDeveloper = /** @class */ (function (_super) {
    __extends(MobDeveloper, _super);
    function MobDeveloper(type, experience, status, busyDays, freeDays) {
        if (type === void 0) { type = 'mob'; }
        if (experience === void 0) { experience = 0; }
        if (status === void 0) { status = 'free'; }
        if (busyDays === void 0) { busyDays = 0; }
        if (freeDays === void 0) { freeDays = 0; }
        var _this = _super.call(this, type, experience, status, busyDays, freeDays) || this;
        _this.id = uuid();
        _this.type = type;
        return _this;
    }
    return MobDeveloper;
}(Employee));
var QaDeveloper = /** @class */ (function (_super) {
    __extends(QaDeveloper, _super);
    function QaDeveloper(type, experience, status, busyDays, freeDays) {
        if (type === void 0) { type = 'qa'; }
        if (experience === void 0) { experience = 0; }
        if (status === void 0) { status = 'free'; }
        if (busyDays === void 0) { busyDays = 0; }
        if (freeDays === void 0) { freeDays = 0; }
        var _this = _super.call(this, type, experience, status, busyDays, freeDays) || this;
        _this.id = uuid();
        _this.type = type;
        return _this;
    }
    return QaDeveloper;
}(Employee));
var Department = /** @class */ (function () {
    function Department(employees, projects, needDevelopers, type) {
        if (needDevelopers === void 0) { needDevelopers = 0; }
        this.developers = employees;
        this.projects = projects;
        this.needDevelopers = needDevelopers;
        this.type = type;
    }
    Department.prototype.getDevelopers = function () {
        var _this = this;
        return this.developers.filter(function (item) { return item.getType() === _this.type; });
    };
    Department.prototype.getProjects = function () {
        var _this = this;
        return this.projects.filter(function (item) { return item.getType() === _this.type; });
    };
    Department.prototype.getDevelopersFree = function () {
        var _this = this;
        return this.developers.filter(function (item) { return item.getType() === _this.type && item.getStatus() === 'free'; });
    };
    Department.prototype.getDevelopersBusy = function () {
        var _this = this;
        return this.developers.filter(function (item) { return item.getType() === _this.type && item.getStatus() === 'busy'; });
    };
    Department.prototype.getProjectsFree = function () {
        var _this = this;
        return this.projects.filter(function (item) { return item.getType() === _this.type && item.getStatus() === 'free'; });
    };
    Department.prototype.getProjectsBusy = function () {
        var _this = this;
        return this.projects.filter(function (item) { return item.getType() === _this.type && item.getStatus() === 'busy'; });
    };
    Department.prototype.resetNeedDevelopers = function () {
        this.needDevelopers = 0;
    };
    Department.prototype.getNeedDevelopers = function () {
        return this.needDevelopers;
    };
    Department.prototype.incrementNeedDevelopers = function () {
        this.needDevelopers += 1;
    };
    return Department;
}());
var WebDepartment = /** @class */ (function (_super) {
    __extends(WebDepartment, _super);
    function WebDepartment(employees, projects, needDevelopers, type) {
        if (needDevelopers === void 0) { needDevelopers = 0; }
        if (type === void 0) { type = 'web'; }
        return _super.call(this, employees, projects, needDevelopers, type) || this;
    }
    WebDepartment.prototype.getEmployeesForDelete = function () {
        function compareExperience(employee1, employee2) {
            return employee1.getExperience() - employee2.getExperience();
        }
        return this.developers
            .filter(function (item) { return item.getStatus() === 'free' && item.getFreeDays() > 2; })
            .sort(compareExperience);
    };
    WebDepartment.prototype.developmentWebProjects = function () {
        var _this = this;
        this.getProjectsFree().forEach(function (itemWebProject) {
            if (_this.getDevelopersFree().length > 0) {
                itemWebProject.setBusyDays(itemWebProject.getComplexity());
                itemWebProject.developmentProject();
                _this.getDevelopersFree()[0].getProject(itemWebProject.getComplexity());
            }
            else {
                _this.incrementNeedDevelopers();
            }
        });
        this.getDevelopersFree().forEach(function (itemFreeDevelopers) {
            itemFreeDevelopers.incrementFreeDays();
        });
        this.getProjectsBusy().forEach(function (itemBusyProject) {
            itemBusyProject.decrementBusyDays();
            itemBusyProject.developmentProject();
        });
        this.getDevelopersBusy().forEach(function (itemBusyDevelopers) {
            itemBusyDevelopers.decrementBusyDays();
            itemBusyDevelopers.changeStatusOfBusy();
        });
    };
    return WebDepartment;
}(Department));
var MobDepartment = /** @class */ (function (_super) {
    __extends(MobDepartment, _super);
    function MobDepartment(employees, projects, needDevelopers, type) {
        if (needDevelopers === void 0) { needDevelopers = 0; }
        if (type === void 0) { type = 'mob'; }
        return _super.call(this, employees, projects, needDevelopers, type) || this;
    }
    MobDepartment.prototype.getEmployeesForDelete = function () {
        function compareExperience(employee1, employee2) {
            return employee1.getExperience() - employee2.getExperience();
        }
        return this.developers
            .filter(function (item) { return item.getStatus() === 'free' && item.getFreeDays() > 2; })
            .sort(compareExperience);
    };
    MobDepartment.prototype.developmentMobProjects = function () {
        var _this = this;
        this.getProjectsFree().forEach(function (itemMobProject) {
            if (_this.getDevelopersFree().length >= itemMobProject.getComplexity()) {
                itemMobProject.setBusyDays(1);
                itemMobProject.developmentProject();
                for (var i = 0; i < itemMobProject.getComplexity(); i += 1) {
                    _this.getDevelopersFree()[0].getProject(1);
                }
            }
            else {
                for (var i = 0; i < itemMobProject.getComplexity(); i += 1) {
                    _this.incrementNeedDevelopers();
                }
            }
        });
        this.getDevelopersFree().forEach(function (itemFreeDevelopers) {
            itemFreeDevelopers.incrementFreeDays();
        });
        this.getProjectsBusy().forEach(function (itemBusyProject) {
            itemBusyProject.decrementBusyDays();
            itemBusyProject.developmentProject();
        });
        this.getDevelopersBusy().forEach(function (itemBusyDevelopers) {
            itemBusyDevelopers.decrementBusyDays();
            itemBusyDevelopers.changeStatusOfBusy();
        });
    };
    return MobDepartment;
}(Department));
var QaDepartment = /** @class */ (function (_super) {
    __extends(QaDepartment, _super);
    function QaDepartment(employees, projects, needDevelopers, type) {
        if (needDevelopers === void 0) { needDevelopers = 0; }
        if (type === void 0) { type = 'qa'; }
        return _super.call(this, employees, projects, needDevelopers, type) || this;
    }
    QaDepartment.prototype.getQaProjects = function () {
        return this.projects.filter(function (item) { return item.getStatus() === 'completed'; });
    };
    QaDepartment.prototype.getQaApprovedProjects = function () {
        return this.projects.filter(function (item) { return item.getStatus() === 'qaApproved'; });
    };
    QaDepartment.prototype.getEmployeesForDelete = function () {
        function compareExperience(employee1, employee2) {
            return employee1.getExperience() - employee2.getExperience();
        }
        return this.developers
            .filter(function (item) { return item.getStatus() === 'free' && item.getFreeDays() > 2; })
            .sort(compareExperience);
    };
    QaDepartment.prototype.developmentQaProjects = function () {
        var _this = this;
        this.getQaProjects().forEach(function (itemQaProject) {
            if (_this.getDevelopersFree().length > 0) {
                itemQaProject.setBusyDays(0);
                itemQaProject.developmentOfQa();
                _this.getDevelopersFree()[0].getProject(1);
            }
            else {
                _this.incrementNeedDevelopers();
            }
        });
        this.getDevelopersFree().forEach(function (itemFreeDevelopers) {
            itemFreeDevelopers.incrementFreeDays();
        });
        this.getQaProjects().forEach(function (itemBusyProject) {
            itemBusyProject.developmentOfQa();
        });
        this.getDevelopersBusy().forEach(function (itemBusyDevelopers) {
            itemBusyDevelopers.decrementBusyDays();
            itemBusyDevelopers.changeStatusOfBusy();
        });
    };
    return QaDepartment;
}(Department));
var Company = /** @class */ (function () {
    function Company() {
        this.employees = [];
        this.projects = [];
        this.director = new Director(this.getEmployees());
        this.webDepartment = new WebDepartment(this.getEmployees(), this.getProjects());
        this.mobDepartment = new MobDepartment(this.getEmployees(), this.getProjects());
        this.qaDepartament = new QaDepartment(this.getEmployees(), this.getProjects());
    }
    Company.prototype.getEmployees = function () {
        return this.employees;
    };
    Company.prototype.getProjects = function () {
        return this.projects;
    };
    Company.prototype.work = function (allDays) {
        for (var i = 1; i <= allDays; i += 1) {
            this.director.getProjects(this.getProjects());
            this.webDepartmentWork();
            this.mobDepartmentWork();
            this.qaDepartmentWork();
        }
        this.getStatistica(allDays);
    };
    Company.prototype.webDepartmentWork = function () {
        this.webDepartment.developmentWebProjects();
        for (var i = 0; i < this.webDepartment.getNeedDevelopers(); i += 1) {
            this.director.addEmployee(this.employees, new WebDeveloper());
        }
        this.webDepartment.resetNeedDevelopers();
        if (this.webDepartment.getEmployeesForDelete().length > 0) {
            this.director.deleteEmployee(this.webDepartment.getEmployeesForDelete()[0].getId());
        }
    };
    Company.prototype.mobDepartmentWork = function () {
        this.mobDepartment.developmentMobProjects();
        for (var i = 0; i < this.mobDepartment.getNeedDevelopers(); i += 1) {
            this.director.addEmployee(this.employees, new MobDeveloper());
        }
        this.mobDepartment.resetNeedDevelopers();
        if (this.mobDepartment.getEmployeesForDelete().length > 0) {
            this.director.deleteEmployee(this.mobDepartment.getEmployeesForDelete()[0].getId());
        }
    };
    Company.prototype.qaDepartmentWork = function () {
        if (this.qaDepartament.getQaProjects().length > 0) {
            this.qaDepartament.developmentQaProjects();
            for (var i = 0; i < this.qaDepartament.getNeedDevelopers(); i += 1) {
                this.director.addEmployee(this.employees, new QaDeveloper());
            }
            this.qaDepartament.resetNeedDevelopers();
            if (this.qaDepartament.getEmployeesForDelete().length > 0) {
                this.director.deleteEmployee(this.qaDepartament.getEmployeesForDelete()[0].getId());
            }
        }
    };
    Company.prototype.getStatistica = function (allDays) {
        console.log("\u0424\u0438\u0440\u043C\u0430 \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442:          " + allDays);
        console.log("\u0412\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u043E \u043F\u0440\u043E\u0435\u043A\u0442\u043E\u0432:      " + this.qaDepartament.getQaApprovedProjects().length);
        console.log("\u041F\u0440\u0438\u043D\u044F\u0442\u043E \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u0447\u0438\u043A\u043E\u0432:   " + this.director.getAddEmployees());
        console.log("\u0423\u0432\u043E\u043B\u0435\u043D\u043E \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u0447\u0438\u043A\u043E\u0432:   " + this.director.getDeleteEmployees());
    };
    return Company;
}());
var company = new Company();
company.work(365);
