import Alpine from 'alpinejs';
import Iodine from '@caneara/iodine';

type Addon = { name: string; description: string; price: Price };
type Page = "info" | "plan" | "add-ons" | "summary" | "thanks";
type Plan = { name: string; price: Price };
type Price = { mouthly: number; yearly: number; }

type FormState = {
  plan: {
    addons: Set<number>;
    selected: number;
  }
  price_mouthly: boolean,
  display_name: string[],
  navigate: Array<Page>,
  pages: Array<Page>,
  page_idx: number;
  addons: Addon[];
  plans: Plan[],
  page: Page,
  format_price: (value: Price, additive?: boolean) => string,
  get_selected_plan_price: () => string,
  toggle_addon: (value: number) => void;
  has_addon: (value: number) => boolean;
  set_selected: (value: number) => void;
  get_selected_plan_name: () => string,
  is_state: (page: Page) => boolean;
  get_addons: () => Array<Addon>,
  goto: (page: number) => void;
  get_total: () => string;
  next_page: () => void,
  next: () => void,
  prev: () => void,
}

type FormHandler = {
  submit: (ev: SubmitEvent) => void,
  validate: (target: HTMLInputElement) => void,
  fields: Record<string, string>
}

function once(callback: (value: boolean) => void, fallback: (value: boolean) => void) {
  let called = false;
  return function (this: unknown, ...args: [boolean]) {
    if (!called) {
      called = true;
      callback.apply(this, args);
    } else {
      fallback.apply(this, args);
    }
  }
}

const iodine = new Iodine();
const phone_test = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/
iodine.rule("phone", (value: string) => phone_test.test(value))
iodine.setErrorMessage("phone", "[FIELD] is not a valid phone number");

Alpine.store("formState", {
  plan: {
    selected: 0,
    addons: new Set([]),
  },
  display_name: ["YOUR INFO", "SELECT PLAN", "ADD-ONS", "SUMMARY"],
  pages: ["info", "plan", "add-ons", "summary", "thanks"],
  price_mouthly: true,
  page: "info",
  page_idx: 0,
  plans: [{
    name: "Arcade",
    price: {
      mouthly: 9,
      yearly: 90,
    }
  }, {
    name: "Advanced",
    price: {
      mouthly: 12,
      yearly: 120
    }
  }, {
    name: "Pro",
    price: {
      mouthly: 15,
      yearly: 150
    }
  }],
  addons: [{
    name: "Online service",
    description: "Access to multiplayer games",
    price: {
      mouthly: 1,
      yearly: 10
    }
  }, {
    name: "Larger storage",
    description: "Extra 1TB of cloud save",
    price: {
      mouthly: 2,
      yearly: 20
    }
  }, {
    name: "Customizable Profile",
    description: "Custom theme on your profile",
    price: {
      mouthly: 2,
      yearly: 20
    }
  }],
  get navigate() {
    return this.pages.slice(0, 4)
  },
  is_state(page) {
    if (page === "summary" && this.page === "thanks") {
      return true;
    }
    return this.page === page;
  },
  toggle() {
    this.price_mouthly = !this.price_mouthly;
  },
  format_price(this: FormState, value, additive = false) {
    return `${additive ? '+' : ''}$${this.price_mouthly ? value.mouthly : value.yearly}/${this.price_mouthly ? "mo" : "yr"}`;
  },
  goto(this: FormState, page) {
    this.page_idx = page;
    this.page = this.pages[this.page_idx];
  },
  prev(this: FormState) {
    if ((this.page_idx - 1) < 0) return;
    this.page_idx--;
    this.page = this.pages[this.page_idx];
  },
  next() {
    if ((this.page_idx + 1) > this.pages.length) return;
    this.page_idx++;
    this.page = this.pages[this.page_idx];
  },
  get_addons() {
    return this.addons.filter((_, i) => this.plan.addons.has(i))
  },
  get_selected_plan_name() {
    return `${this.plans[this.plan.selected].name} (${this.price_mouthly ? "Monthly" : "Yearly"})`;
  },
  get_selected_plan_price() {
    return this.format_price(this.plans[this.plan.selected].price, false);
  },
  has_addon(value) {
    return this.plan.addons.has(value);
  },
  toggle_addon(value) {
    if (this.plan.addons.has(value)) {
      this.plan.addons.delete(value);
      return;
    }
    this.plan.addons.add(value);
  },
  set_selected(value) {
    this.plan.selected = value;
  },
  get_total() {

    let base = { ...this.plans[this.plan.selected].price };

    let total = this.get_addons().reduce((a, b) => {
      a.mouthly += b.price.mouthly;
      a.yearly += b.price.yearly;
      return a;
    }, base);

    return this.format_price(total, false);
  },
  next_page() {

    this.next();
  },
} as FormState);

Alpine.directive("page", (el, { expression, modifiers }, { effect }) => {
  const state = Alpine.store("formState") as FormState;

  if (!el._x_doHide) el._x_doHide = () => {
    Alpine.mutateDom(() => {
      el.style.setProperty("display", "none", modifiers.includes('important') ? 'important' : undefined);
    });
  }

  if (!el._x_doShow) el._x_doShow = () => {
    Alpine.mutateDom(() => {
      if (el.style.length === 1 && el.style.display === "none") {
        el.removeAttribute("style");
      } else {
        el.style.removeProperty("display");
      }
    });
  }

  let hide = () => {
    el._x_doHide?.call(this);
    el._x_isShown = false;
  }

  let show = () => {
    el._x_doShow?.call(this);
    el._x_isShown = true;
  }

  let clickAwayCompatibleShow = () => setTimeout(show);
  let firstTime = true;

  const toggle = once(value => value ? show() : hide(), value => {
    if (typeof el._x_toggleAndCascadeWithTransitions === "function") {
      el._x_toggleAndCascadeWithTransitions(el, value, show, hide);
    } else {
      value ? clickAwayCompatibleShow() : hide();
    }
  });

  let oldValue: boolean | undefined;

  effect(() => {
    const value = state.page === expression;
    if (!firstTime && value === oldValue) return;

    if (modifiers.includes('immediate')) value ? clickAwayCompatibleShow() : hide()

    toggle(value);

    oldValue = value;

    firstTime = false;
  });

});

Alpine.data("formdata", function () {
  return {
    fields: {},
    validate(target: HTMLInputElement) {
      const rules = JSON.parse(target.getAttribute("rules") ?? "[]");
      const name = target.getAttribute("name");
      if (!target || !name) return;
      const { error, valid } = iodine.assert(target?.value, rules);

      if (!valid) {
        target?.setCustomValidity(error);
      } else {
        target?.setCustomValidity("");
      }

      this.fields[name] = target.validationMessage;

      target?.reportValidity();
    },
    submit(ev) {

      for (const input of (ev.target as HTMLFormElement).querySelectorAll("input")) {
        this.validate(input);
      }

      if ((ev.target as HTMLFormElement).checkValidity()) {
        (Alpine.store("formState") as FormState).next();
      }

      return true
    }
  } as FormHandler
});

Alpine.start();