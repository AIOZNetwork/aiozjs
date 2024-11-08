import { Slip10RawIndex } from "@cosmjs/crypto";

import { makeAiozPath, makeCosmoshubPath, makeEthPath } from "./paths";

describe("paths", () => {
  describe("makeCosmoshubPath", () => {
    it("works", () => {
      // m/44'/118'/0'/0/0
      expect(makeCosmoshubPath(0)).toEqual([
        Slip10RawIndex.hardened(44),
        Slip10RawIndex.hardened(118),
        Slip10RawIndex.hardened(0),
        Slip10RawIndex.normal(0),
        Slip10RawIndex.normal(0),
      ]);
      // m/44'/118'/0'/0/123
      expect(makeCosmoshubPath(123)).toEqual([
        Slip10RawIndex.hardened(44),
        Slip10RawIndex.hardened(118),
        Slip10RawIndex.hardened(0),
        Slip10RawIndex.normal(0),
        Slip10RawIndex.normal(123),
      ]);
    });
  });

  describe("makeAiozPath", () => {
    it("works", () => {
      // m/44'/989'/0'/0/0
      expect(makeAiozPath(0)).toEqual([
        Slip10RawIndex.hardened(44),
        Slip10RawIndex.hardened(989),
        Slip10RawIndex.hardened(0),
        Slip10RawIndex.normal(0),
        Slip10RawIndex.normal(0),
      ]);
      // m/44'/989'/0'/0/123
      expect(makeAiozPath(123)).toEqual([
        Slip10RawIndex.hardened(44),
        Slip10RawIndex.hardened(989),
        Slip10RawIndex.hardened(0),
        Slip10RawIndex.normal(0),
        Slip10RawIndex.normal(123),
      ]);
    });
  });

  describe("makeEthPath", () => {
    it("works", () => {
      // m/44'/60'/0'/0/0
      expect(makeEthPath(0)).toEqual([
        Slip10RawIndex.hardened(44),
        Slip10RawIndex.hardened(60),
        Slip10RawIndex.hardened(0),
        Slip10RawIndex.normal(0),
        Slip10RawIndex.normal(0),
      ]);
      // m/44'/60'/0'/0/123
      expect(makeEthPath(123)).toEqual([
        Slip10RawIndex.hardened(44),
        Slip10RawIndex.hardened(60),
        Slip10RawIndex.hardened(0),
        Slip10RawIndex.normal(0),
        Slip10RawIndex.normal(123),
      ]);
    });
  });
});
