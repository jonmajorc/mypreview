import { HashtagModel } from "./hashtag"

test("can be created", () => {
  const instance = HashtagModel.create({})

  expect(instance).toBeTruthy()
})
