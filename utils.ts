import { MenuItem } from "./types";

// Global array
export let menuItems: MenuItem[] = [];

// Add item
export function addItem(item: MenuItem) {
menuItems.push(item);
}

// Remove item
export function removeItem(id: string) {
menuItems = menuItems.filter(item => item.id !== id);
}

// Calculate average prices (for loop example)
export function getAveragePrices(): Record<string, number> {
const courses: Record<string, { total: number; count: number }> = {};
for (const item of menuItems) {
if (!courses[item.course]) {
courses[item.course] = { total: 0, count: 0 };
}
courses[item.course].total += item.price;
courses[item.course].count++;
}

const averages: Record<string, number> = {};
for (const course in courses) {
averages[course] = courses[course].total / courses[course].count;
}
return averages;
}

// While loop example
export function clearAllItems() {
let i = 0;
while (i < menuItems.length) {
menuItems.pop();
}
}
