import {decodeResponse} from "@onflow/sdk"
import {config} from "@onflow/config"

export const decode = async response => {
  const decodersFromConfig = await config().where(/^decoder\./)
  const decoders = Object.fromEntries(
    Object.entries(decodersFromConfig).map(([pattern, xform]) => {
      pattern = `/${pattern.replace(/^decoder\./, "")}$/`
      return [pattern, xform]
    })
  )
  return decodeResponse(response, decoders)
}
