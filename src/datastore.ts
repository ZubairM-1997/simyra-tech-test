import Stage from "./utils/lib/stage";
import Task from "./utils/lib/task";


export const stages : Stage[] = [
    new Stage('Foundation', [
        new Task('Set up virtual office'),
        new Task('Set mission and vision'),
        new Task('Select business name'),
        new Task('Buy domains'),
      ]),
      new Stage('Discovery', [
        new Task('Create roadmap'),
        new Task('Competitor analysis'),
      ]),
      new Stage('Delivery', [
        new Task('Release marketing website'),
        new Task('Release MVP'),
      ]),
]