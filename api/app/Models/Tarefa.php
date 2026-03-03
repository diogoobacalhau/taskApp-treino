<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tarefa extends Model
{
    protected $fillable = ['nome,descricao,status,user_id'];

    public function owner(){
        return $this->belongsTo(User::class, 'user_id');
    }
}
