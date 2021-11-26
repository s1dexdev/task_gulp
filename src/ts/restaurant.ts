interface IModal {
  open(): void;
  close(): void;
  deleteMarkup(): void;
}

interface Input {
  [key: number]: string;
}

interface IForm {
  id?: string;
  formName: string;
  inputs: Input[];
}

interface IEmployee {
  name: string;
  surname: string;
  departmentId: string;
  position: string;
  salary: number;
  isFired: boolean;
}

interface IDepartment {
  title: string;
  id: string;
  employees: IEmployee[];
}

interface IPositionsId {
  [key: string]: string;
}

interface IRestaurant {
  wrapper: HTMLElement;
  departments: IDepartment[];
  positionsId: IPositionsId;

  render(): void;

  createMarkupRestaurant(): HTMLElement;

  createMarkupDepartment(): HTMLElement;

  createMarkupForm(props: IForm): HTMLElement;

  handleForm(event: Event): void;

  setDepartmentForm(): void;

  setEmployeeForm(): void;

  createModal(props: IForm): IModal;

  createMarkupModal(props: IForm): HTMLElement;

  deleteDepartment(event: Event): void;

  findDepartment(id: string): IDepartment;

  createEmployee(employee: IEmployee): IEmployee | null;

  getAmountSalaryTotal(callback: Function): { [key: string]: number };

  getAmountSalaryDetail(): { [key: string]: object };

  getNumberEmployees(callback: Function): number;

  findDepartmentWithoutHead(positionId: string): IDepartment[];
}

class Restaurant implements IRestaurant {
  wrapper: HTMLElement;
  departments: IDepartment[];
  positionsId: IPositionsId;

  constructor(
    selector: string,
    positions: IPositionsId,
    departments: IDepartment[]
  ) {
    this.wrapper = document.querySelector(selector) as HTMLElement;
    this.departments = departments || [];
    this.positionsId = positions || {};

    this.render();
  }

  render(): void {
    const restaurant: HTMLElement = this.createMarkupRestaurant();

    this.wrapper.innerHTML = "";
    this.wrapper.appendChild(restaurant);
  }

  createMarkupRestaurant(): HTMLElement {
    const restaurant: HTMLElement = document.createElement("DIV");

    restaurant.innerHTML = `
            <div class="buttons">
                <button type="button" data-action="setDepartmentForm">Add new department</button>
                <button type="button" data-action="setEmployeeForm">Add new employee</button>
            </div>
            <p class="text-title">General info:</p>
            <ul>
                <li>
                    <p>Number of employees: ${this.getNumberEmployees(
                      (employee: IEmployee): IEmployee => employee
                    )}</p>
                </li>
                <li>
                    <p>Number of fired employees: ${this.getNumberEmployees(
                      ({ isFired }: { isFired: boolean }): boolean =>
                        isFired === true
                    )}</p>
                </li>
            </ul>
            <p class="text-title">Departments info:</p>
                   
        `;

    restaurant.appendChild(this.createMarkupDepartment());
    restaurant.addEventListener("click", (event: MouseEvent): void => {
      const { action } = (event.target as HTMLElement).dataset;

      (this as any)[action](event);
    });

    return restaurant;
  }

  createMarkupDepartment(): HTMLElement {
    const salaryInfo: any = this.getAmountSalaryTotal(
      (salary: number) => salary
    );
    const departmentsList: HTMLElement = document.createElement("UL");

    departmentsList.classList.add("departments");

    for (let i: number = 0; i < this.departments.length; i++) {
      const { title, id }: { title: string; id: string } = this.departments[i];
      const item: HTMLElement = document.createElement("LI");

      item.classList.add("departments-item");
      item.innerHTML = `
                <p>Department title - ${title}</p>
                <p>Department number: ${id}</p>
                <p>Total salary by department: ${salaryInfo[title]}</p>
                <button type="button" data-action="deleteDepartment" data-number=${id}>Delete</button>
            `;

      departmentsList.appendChild(item);
    }

    return departmentsList;
  }

  createMarkupForm(props: IForm): HTMLElement {
    const { formName, inputs } = props;
    const form: HTMLElement = document.createElement("FORM");

    form.classList.add("form");
    form.setAttribute("data-name", formName);

    for (let i: number = 0; i < inputs.length; i++) {
      const input: HTMLElement = document.createElement("INPUT");

      for (let key in inputs[i]) {
        input.setAttribute(key, inputs[i][key]);
      }

      form.appendChild(input);
    }

    form.insertAdjacentHTML(
      "beforeend",
      `
            <button type="submit" data-action="accept">Add</button>
        `
    );

    form.addEventListener("submit", (event: Event): void => {
      event.preventDefault();

      this.handleForm(event);
    });

    return form;
  }

  handleForm(event: Event): void {
    const { name } = (event.target as HTMLFormElement).dataset;
    const data: FormData = new FormData(event.target as HTMLFormElement);
    const result: any = {};

    for (let item of data.entries()) {
      let key: string = item[0];
      let value: any = item[1];

      if (key === "salary") {
        value = Number(value);
      }

      result[key] = value;
    }

    (this as any)[name](result);
    this.render();
  }

  setDepartmentForm(): void {
    this.createModal({
      formName: "createDepartment",
      inputs: [
        {
          name: "title",
          type: "text",
          placeholder: "title",
          class: "input",
          pattern: "[a-zA-Z]{5,10}",
        },
        {
          name: "departmentId",
          type: "number",
          placeholder: "department number",
          class: "input",
          pattern: "[0-9]{1,10}",
        },
      ],
    });
  }

  setEmployeeForm(): void {
    this.createModal({
      formName: "createEmployee",
      inputs: [
        {
          name: "name",
          type: "text",
          placeholder: "name",
          class: "input",
          pattern: "[a-zA-Z]{2,}",
        },
        {
          name: "surname",
          type: "text",
          placeholder: "surname",
          class: "input",
          pattern: "[a-zA-Z]{2,}",
        },
        {
          name: "departmentId",
          type: "number",
          placeholder: "departmentId",
          class: "input",
          pattern: "[0-9]{1,10}",
        },
        {
          name: "position",
          type: "number",
          placeholder: "position number",
          class: "input",
          pattern: "[0-9]{1,10}",
        },
        {
          name: "salary",
          type: "number",
          placeholder: "salary",
          class: "input",
          pattern: "[0-9]{1,10}",
        },
      ],
    }).open();
  }

  createModal(props: IForm): IModal {
    props = props || null;

    let isFlag: boolean = false;
    const modalWindowMarkup: HTMLElement = this.createMarkupModal(props);
    const modal: any = {
      open() {
        if (isFlag) {
          return;
        }

        modalWindowMarkup.classList.add("open");
      },
      close() {
        modalWindowMarkup.classList.remove("open");
      },
      deleteMarkup() {
        (modalWindowMarkup.parentNode as HTMLElement).removeChild(
          modalWindowMarkup
        );
        modalWindowMarkup.removeEventListener("click", listener);
        window.removeEventListener("keydown", listener);

        isFlag = true;
      },
    };

    function listener(event: Event) {
      if (
        (event.target as HTMLElement).dataset.close ||
        (event as KeyboardEvent).code === "Escape"
      ) {
        modal.close();
        modal.deleteMarkup();
      }
    }

    modalWindowMarkup.addEventListener("click", listener);
    window.addEventListener("keydown", listener);

    return modal;
  }

  createMarkupModal(props: IForm): HTMLElement {
    const container: HTMLElement = document.createElement("div");

    container.classList.add("modal");
    container.insertAdjacentHTML(
      "afterbegin",
      `
                <div class="modal-overlay" data-close="true">
                    <div class="modal-window">
                        <span class="modal-close" data-close="true">&times;</span>

                    </div>
                </div>
                `
    );

    const modalWindow: HTMLElement = container.querySelector(
      ".modal-window"
    ) as HTMLElement;

    modalWindow.appendChild(this.createMarkupForm(props));
    this.wrapper.appendChild(container);

    return container;
  }

  deleteDepartment(event: Event): void {
    const id: any = (event.target as HTMLElement).dataset.number;

    this.departments = this.departments.filter(
      (department) => department.id !== id
    );

    this.render();
  }

  findDepartment(id: string): IDepartment {
    return this.departments.find((department) => department.id === id);
  }

  createDepartment(department: IDepartment): IDepartment | boolean {
    const checkDepartment: IDepartment | undefined = this.findDepartment(
      department.id
    );

    if (checkDepartment) {
      return false;
    }

    department.employees = [];
    this.departments.push(department);

    return department;
  }

  createEmployee(employee: IEmployee): IEmployee | null {
    const checkDepartment: IDepartment | undefined = this.findDepartment(
      employee.departmentId
    );

    if (checkDepartment) {
      employee.position = this.positionsId[employee.position];
      employee.isFired = false;

      checkDepartment.employees.push(employee);

      return employee;
    }

    return null;
  }

  getAmountSalaryTotal(callback: Function): { [key: string]: number } {
    return this.departments.reduce((acc: any, { title, employees }) => {
      let counterPersons: number = 0;
      let salaryInfo: number = employees.reduce(
        (accumulator, { salary, isFired }) => {
          if (!isFired) {
            accumulator += salary;
            counterPersons++;
          }

          return accumulator;
        },
        0
      );

      acc[title] = callback(salaryInfo, counterPersons);

      return acc;
    }, {});
  }

  getAmountSalaryDetail(): { [key: string]: object } {
    return this.departments.reduce((acc: any, { title, employees }) => {
      let salaryInfo: {} = employees.reduce(
        (accumulator: any, { position, salary, isFired }) => {
          if (!isFired) {
            if (!accumulator[position]) {
              accumulator[position] = {
                maxSalary: salary,
                minSalary: salary,
              };
            }

            if (accumulator[position].maxSalary < salary) {
              accumulator[position].maxSalary = salary;
            }

            if (accumulator[position].minSalary > salary) {
              accumulator[position].minSalary = salary;
            }
          }

          return accumulator;
        },
        {}
      );

      acc[title] = salaryInfo;

      return acc;
    }, {});
  }

  getNumberEmployees(callback: Function): number {
    let counter: number = 0;

    this.departments.forEach(({ employees }) =>
      employees.forEach((employee) => {
        if (callback(employee)) {
          counter++;
        }
      })
    );

    return counter;
  }

  findDepartmentWithoutHead(positionId: string): IDepartment[] {
    const result: any[] = this.departments.reduce((acc: any[], department) => {
      let counter = 0;

      department.employees.forEach(({ position }) => {
        if (position === this.positionsId[positionId]) {
          counter++;
        }
      });

      if (counter === 0) {
        acc.push(department);
      }

      return acc;
    }, []);

    return result;
  }
}

const restPositions = {
  1: "manager",
  2: "barman",
  3: "cook",
  4: "waiter",
};

const restDepartments = [
  {
    title: "Bar",
    id: "1",
    employees: [
      {
        name: "James",
        surname: "James",
        departmentId: "1",
        position: restPositions[1],
        salary: 5000,
        isFired: false,
      },
      {
        name: "Robert",
        surname: "Robert",
        departmentId: "1",
        position: restPositions[2],
        salary: 3000,
        isFired: false,
      },
      {
        name: "John",
        surname: "John",
        departmentId: "1",
        position: restPositions[2],
        salary: 3000,
        isFired: false,
      },
    ],
  },
  {
    title: "Cook",
    id: "2",
    employees: [
      {
        name: "Mary",
        surname: "Mary",
        departmentId: "2",
        position: restPositions[1],
        salary: 6000,
        isFired: false,
      },
      {
        name: "Patricia",
        surname: "Patricia",
        departmentId: "2",
        position: restPositions[3],
        salary: 4000,
        isFired: false,
      },
      {
        name: "Jennifer",
        surname: "Jennifer",
        departmentId: "2",
        position: restPositions[3],
        salary: 4000,
        isFired: false,
      },
      {
        name: "Jennifer",
        surname: "Jennifer",
        departmentId: "2",
        position: restPositions[3],
        salary: 4000,
        isFired: false,
      },
    ],
  },
  {
    title: "Hall",
    id: "3",
    employees: [
      {
        name: "Michael",
        surname: "Michael",
        departmentId: "2",
        position: restPositions[1],
        salary: 3000,
        isFired: false,
      },
      {
        name: "Linda",
        surname: "Linda",
        departmentId: "2",
        position: restPositions[3],
        salary: 1000,
        isFired: false,
      },
      {
        name: "Elizabeth",
        surname: "Elizabeth",
        departmentId: "2",
        position: restPositions[3],
        salary: 1000,
        isFired: false,
      },
      {
        name: "Elizabeth",
        surname: "Elizabeth",
        departmentId: "2",
        position: restPositions[3],
        salary: 1000,
        isFired: false,
      },
      {
        name: "Elizabeth",
        surname: "Elizabeth",
        departmentId: "2",
        position: restPositions[3],
        salary: 1000,
        isFired: true,
      },
    ],
  },
];

document.addEventListener("DOMContentLoaded", (event) => {
  new Restaurant(".app", restPositions, restDepartments);
});
