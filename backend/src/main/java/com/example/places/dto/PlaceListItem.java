package com.example.places.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

/** 一覧表示用 */
public record PlaceListItem(
        @JsonProperty("place_id") Long placeId,
        String name,
        String area,
        String category) {
}
