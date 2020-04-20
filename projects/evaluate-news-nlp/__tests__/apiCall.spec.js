import { apiRes } from "../src/client/js/getAPIdata"

describe("Testing the API call", () => {
  test("Testing the API call", () => {
    apiRes({text: "Hey there!"})
  })})