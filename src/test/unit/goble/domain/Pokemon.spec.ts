import { areSameChargedMoveType, isSameFastMoveType, Pokemon } from "@/goble/domain/Pokemon";
import { buildDiggersby, buildGliscor } from "./Pokemon.fixture";

describe('Pokemon', () => {
  it('should check fast move', () => {
    expect(isSameFastMoveType(buildDiggersby(true), buildDiggersby(true))).toEqual(true);
  });

  it('should not check fast move', () => {
    expect(isSameFastMoveType(buildGliscor(), buildDiggersby(true))).toEqual(false);
  });

  it('should check charged move', () => {
    expect(areSameChargedMoveType(buildGliscor(), buildDiggersby(true))).toEqual([true, false]);
  });

  it('should check charged move', () => {
    expect(areSameChargedMoveType(
      { chargedMove1: { type: "ghost" }, chargedMove2: { type: "ghost" } } as Pokemon,
      { chargedMove1: { type: "ghost" }, chargedMove2: { type: "ice" } } as Pokemon
    ))
    .toEqual([true, false]);
  });

  it('should check charged move', () => {
    expect(areSameChargedMoveType(
      { chargedMove1: { type: "fire" }, chargedMove2: { type: "ghost" } } as Pokemon,
      { chargedMove1: { type: "ghost" }, chargedMove2: { type: "ice" } } as Pokemon
    ))
    .toEqual([false, true]);
  });

  it('should check charged move', () => {
    expect(areSameChargedMoveType(
    { chargedMove1: { type: "ice" }, chargedMove2: { type: "ghost" } } as Pokemon,
    { chargedMove1: { type: "ghost" }, chargedMove2: { type: "ice" } } as Pokemon
    ))
    .toEqual([true, true]);
  });

  it('should check charged move', () => {
    expect(areSameChargedMoveType(
    { chargedMove1: { type: "ice" }, chargedMove2: { type: "ghost" } } as Pokemon,
    { chargedMove1: { type: "ghost" }, chargedMove2: { type: "ghost" } } as Pokemon
    ))
    .toEqual([false, true]);
  });
});
