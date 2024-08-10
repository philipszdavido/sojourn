import {removeElements} from "../../src/utils/remove-elements";

describe("removeElements", () => {
    it("should remove elements from elements", () => {
        const result = removeElements(0, 3, [1,2,3,4,5])

        expect(result).toEqual([5])

    })
})