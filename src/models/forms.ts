import { configure, makeAutoObservable, toJS } from "mobx";
import _ from "lodash";
import storage from "local-storage-fallback";
import { formList } from "types/formArray";

configure({
  enforceActions: "never"
});
export interface ITodoModel {
  id: number;
  text: string;
  done: boolean;
}

class FormsStore {
  formList: formList[] = [];
  formArray: formList = this.resetTodoData();

  resetTodoData() {
    return {
      id: "",
      title: "",
      fieldArray: []
    };
  }

  constructor() {
    makeAutoObservable(this);
  }

  load = async () => {
    const localData = storage.getItem("formList" || "");

    if (localData) {
      this.formList = JSON.parse(localData);
    }
  };

  addForm() {
    console.log(`myForm${this.formArray.title}`);
    this.formList.push(this.formArray);
    storage.setItem("formList", JSON.stringify(this.formList));
    this.formArray = this.resetTodoData();
  }

  getFormbyId(id: string) {
    const formVal = _.find(this.formList, (form) => {
      return form.id === id;
    });

    return toJS(formVal);
  }

  deleteFormbyId(id: string) {
    const formVal = _.filter(this.formList, (form) => {
      return form.id !== id;
    });
    this.formList = formVal;
    storage.setItem("formList", JSON.stringify(this.formList));
  }

  getAllForms() {
    return toJS(this.formList);
  }
}

const formsStore = new FormsStore();
export default formsStore;
