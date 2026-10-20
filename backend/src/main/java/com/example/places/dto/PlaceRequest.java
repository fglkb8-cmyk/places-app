package com.example.places.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

/** 場所の登録・更新で受け取る入力内容 */
public record PlaceRequest(
        @NotBlank(message = "場所名を入力してください")
        @Size(max = 50, message = "場所名は50文字以内で入力してください")
        String name,

        @NotBlank(message = "エリアを入力してください")
        @Size(max = 50, message = "エリアは50文字以内で入力してください")
        String area,

        @NotBlank(message = "カテゴリを選択してください")
        @Pattern(regexp = "(カフェ|グルメ|観光地|温泉|その他)?", message = "カテゴリを選択してください")
        String category,

        @Size(max = 200, message = "メモは200文字以内で入力してください")
        String memo) {
}
