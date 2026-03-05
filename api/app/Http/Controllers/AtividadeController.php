<?php

namespace App\Http\Controllers;

use App\Models\Atividade;
use Illuminate\Http\Request;

class AtividadeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Atividade::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nome' => 'required|string'
        ]);

        $atividade = Atividade::create([
            'nome' => $validated['nome'],
            'user_id' => auth()->id()
        ]);

        return response()->json($atividade,201);

    }

    /**
     * Display the specified resource.
     */
    public function show(Atividade $atividade)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Atividade $atividade)
    {
        $validated = $request->validate([
            'nome' => 'required|string'
        ]);

        $atividade->update($validated);
        
        return response()->json($atividade,200);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Atividade $atividade)
    {
        //
    }
}
