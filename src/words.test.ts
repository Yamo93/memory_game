import { words } from "./words";

test("word list should be 200", () => {
    expect(words).toHaveLength(200);
});