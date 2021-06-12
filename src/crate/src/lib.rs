extern crate wasm_bindgen;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn add(x: f64, y: f64) -> f64 {
    x + y
}
