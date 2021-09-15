import { factory } from 'typescript'

import {createTypeAlias, print, createEventType, createType } from './'

/**
 * type ConvertStart = {
 *   action: 'convert_start'
 *   category: 'convert'
 * }
 */
const createConvertStart = () => factory.createTypeAliasDeclaration(
  undefined,
  undefined,
  factory.createIdentifier("ConvertStart"),
  undefined,
  factory.createTypeLiteralNode([
    factory.createPropertySignature(
      undefined,
      factory.createIdentifier("action"),
      undefined,
      factory.createLiteralTypeNode(factory.createStringLiteral("convert_start"))
    ),
    factory.createPropertySignature(
      undefined,
      factory.createIdentifier("category"),
      undefined,
      factory.createLiteralTypeNode(factory.createStringLiteral("convert"))
    )
  ])
)

describe('createTypeAlias で型作成のための値から type alias を作成する', () => {
  test('型名 ConvertStart 、プロパティ・値が与えられたとき、ConvertStart 型の AST を作成する', () => {
    const actual = createTypeAlias(
      'ConvertStart',
      {
        action: 'convert_start',
        category: 'convert',
      }
    )
    const expected = createConvertStart()

    expect(actual).toStrictEqual(expected)
  })

  test('型名 ConvertEnd 、プロパティ・値が与えられたとき、ConvertEnd 型の AST を作成する', () => {
    const actual = createTypeAlias(
      'ConvertEnd',
      {
        action: 'convert_end',
        category: 'convert',
      }
    )
    /**
     * type ConvertEnd = {
     *   action: 'convert_end'
     *   category: 'convert'
     * }
     */
    const expected = factory.createTypeAliasDeclaration(
      undefined,
      undefined,
      factory.createIdentifier("ConvertEnd"),
      undefined,
      factory.createTypeLiteralNode([
        factory.createPropertySignature(
          undefined,
          factory.createIdentifier("action"),
          undefined,
          factory.createLiteralTypeNode(factory.createStringLiteral("convert_end"))
        ),
        factory.createPropertySignature(
          undefined,
          factory.createIdentifier("category"),
          undefined,
          factory.createLiteralTypeNode(factory.createStringLiteral("convert"))
        )
      ])
    )

    expect(actual).toStrictEqual(expected)
  })
})

describe('print で AST を文字列に変換する', () => {
  test('ConvertStart の AST を与えたとき、ConvertStart 型を出力する', () => {
    const arg = createConvertStart()
    const actual = print(arg)
    const expected = `type ConvertStart = {
    action: "convert_start";
    category: "convert";
};`

    expect(actual).toBe(expected)
  })
})

describe('createEventType', () => {
  test('ConvertStart と ConvertEnd を受け取ったとき、その二つを持った Event 型を生成する', () => {
    const arg = ['ConvertStart', 'ConvertEnd']
    const actual = createEventType(arg)
    const expected = `export type Event = (ConvertStart | ConvertEnd) & {
  label?: Record<string, string | number | boolean>;
  value?: string;
};`

    expect(actual).toBe(expected)
  })
})

describe('createType', () => {
  test('型名と property を与えたとき、引数の型との交差型 Event 型を生成する', () => {
    const arg = [
      {
        name: 'ConvertStart',
        property: {
          action: 'convert_start',
          category: 'convert',
        }
      },
      {
        name: 'ConvertEnd',
        property: {
          action: 'convert_end',
          category: 'convert',
        },
      },
    ]
    const actual = createType(arg)
    const expected = `type ConvertStart = {
    action: "convert_start";
    category: "convert";
};

type ConvertEnd = {
    action: "convert_end";
    category: "convert";
};

export type Event = (ConvertStart | ConvertEnd) & {
  label?: Record<string, string | number | boolean>;
  value?: string;
};`

    expect(actual).toBe(expected)
  })
})
