import { createHash } from 'crypto'
import logger from './logger'

/**
 * Method to generate Base64 encoded SHA256 of the given input
 * @param input Input string to compute the SHA256 hash
 * @returns Computed SHA256 string
 */
export const computeSHA256 = (input: string): string => {
  try {
    const hash = createHash('sha256')
    hash.update(input, 'utf8')

    return hash.digest('hex')
  } catch (err) {
    logger.error('Failed to compute SHA256 for' + input)
    throw err
  }
}

/**
 * Generates base64 encoded string from the given input
 * @param input Input string to generate its base64 encoded form
 * @returns Base64 encoded string
 */
export const encodeBase64 = (input: string): string => {
  try {
    return Buffer.from(input).toString('base64')
  } catch (err) {
    logger.error('Failed to base64 encode the input' + input)
    throw err
  }
}

/**
 * Decodes a base64 encoded string
 * @param input Input string to be decoded from its base64 form
 * @returns Decoded string
 */
export const decodeBase64 = (input: string): string => {
  try {
    return Buffer.from(input, 'base64').toString()
  } catch (err) {
    logger.error('Failed to base64 decode the input', input)
    throw err
  }
}
